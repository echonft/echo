import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsForCollectionAsTarget } from '@echo/firestore/crud/listing/get-listings-for-collection-as-target'
import { getListingMockById } from '@echo/firestore-mocks/listing/get-listing-mock-by-id'
import type { Listing } from '@echo/model/types/listing'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { uncheckedUpdateListing } from '@test-utils/listing/unchecked-update-listing'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getListingsForCollectionAsTarget', () => {
  const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
  const id = 'jUzMtPGKM62mMhEcmbN4'
  let initialExpiresAt: number

  async function setExpired(listing: Listing) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0).unix()
    await uncheckedUpdateListing(listing.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(listing)
  }

  async function setNotExpired(listing: Listing) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0).unix()
    await uncheckedUpdateListing(listing.id, { expiresAt })
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
    await uncheckedUpdateListing(id, { expiresAt: initialExpiresAt })
  })

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForCollectionAsTarget('1aomCtnoesD7WVll6Yi1')
    expect(listings).toEqual([])
  })

  it('returns the listings for the which the collection is included in the targets', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    const listings = await getListingsForCollectionAsTarget(collectionId)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCollectionAsTarget(collectionId, { states: ['OFFERS_PENDING', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollectionAsTarget(collectionId, { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCollectionAsTarget(collectionId, {
      notStates: ['PARTIALLY_FULFILLED', 'CANCELLED']
    })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollectionAsTarget(collectionId, { notStates: ['OFFERS_PENDING', 'FULFILLED'] })
    expect(listings.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getListingMockById(id))
    let listings = await getListingsForCollectionAsTarget(collectionId, { includeExpired: true })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollectionAsTarget(collectionId, { includeExpired: false })
    expect(listings.length).toBe(0)
    listings = await getListingsForCollectionAsTarget(collectionId)
    expect(listings.length).toBe(0)
  })
})
