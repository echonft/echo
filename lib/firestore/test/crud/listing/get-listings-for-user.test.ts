import { ListingFilterAsItem } from '@echo/firestore/constants/listing-filter-as'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type Listing } from '@echo/model/types/listing'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { unchecked_updateListing } from '@test-utils/listing/unchecked_update-listing'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getListingsForUser - as creator', () => {
  const id = 'jUzMtPGKM62mMhEcmbN4'
  const username = 'johnnycagewins'
  const filters: ListingQueryFilters = { as: ListingFilterAsItem }
  let initialExpiresAt: number

  async function setExpired(listing: Listing) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0).unix()
    await unchecked_updateListing(listing.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(listing)
  }

  async function setNotExpired(listing: Listing) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0).unix()
    await unchecked_updateListing(listing.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', false))(listing)
  }

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialExpiresAt = listing!.expiresAt
  })
  afterEach(async () => {
    await unchecked_updateListing(id, { expiresAt: initialExpiresAt })
  })

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForUser('not-found', filters)
    expect(listings).toEqual([])
  })

  it('returns the listings for the creator', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    const listings = await getListingsForUser(username, filters)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForUser(username, assoc('state', ['OFFERS_PENDING', 'CANCELLED'], filters))
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForUser(username, assoc('state', ['CANCELLED'], filters))
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForUser(username, assoc('notState', ['PARTIALLY_FULFILLED', 'CANCELLED'], filters))
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForUser(username, assoc('notState', ['OFFERS_PENDING', 'FULFILLED'], filters))
    expect(listings.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getListingMockById(id))
    let listings = await getListingsForUser(username, assoc('includeExpired', true, filters))
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForUser(username, assoc('includeExpired', false, filters))
    expect(listings.length).toBe(0)
    listings = await getListingsForUser(username, filters)
    expect(listings.length).toBe(0)
  })
})
