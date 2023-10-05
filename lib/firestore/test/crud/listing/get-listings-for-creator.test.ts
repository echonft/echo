import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { getListingMockById } from '@echo/firestore-mocks/listing/get-listing-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { updateListing } from '@test-utils/listing/update-listing'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getListingsForCreator', () => {
  const id = 'jUzMtPGKM62mMhEcmbN4'
  let initialExpiresAt: number

  async function setExpired(listing: FirestoreListing) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0).unix()
    await updateListing(listing.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(listing)
  }

  async function setNotExpired(listing: FirestoreListing) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0).unix()
    await updateListing(listing.id, { expiresAt })
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
    await updateListing(id, { expiresAt: initialExpiresAt })
  })

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForCreator('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings for the creator', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    const listings = await getListingsForCreator('johnnycagewins')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCreator('johnnycagewins', { states: ['OPEN', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCreator('johnnycagewins', { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCreator('johnnycagewins', { notStates: ['INVALID', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCreator('johnnycagewins', { notStates: ['OPEN', 'FULFILLED'] })
    expect(listings.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getListingMockById(id))
    let listings = await getListingsForCreator('johnnycagewins', { includeExpired: true })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCreator('johnnycagewins', { includeExpired: false })
    expect(listings.length).toBe(0)
    listings = await getListingsForCreator('johnnycagewins')
    expect(listings.length).toBe(0)
  })
})
