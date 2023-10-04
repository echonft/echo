import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsForCollectionAsItem } from '@echo/firestore/crud/listing/get-listings-for-collection-as-item'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { getListingMockById } from '@echo/firestore-mocks/listing/get-listing-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { updateListing } from '@test-utils/listing/update-listing'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getListingsForCollectionAsItem', () => {
  const collectionId = '1aomCtnoesD7WVll6Yi1'
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
    const listings = await getListingsForCollectionAsItem('Rc8pLQXxgyQGIRL0fr13')
    expect(listings).toEqual([])
  })

  it('returns the listings for the which the collection is included in the items', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    const listings = await getListingsForCollectionAsItem(collectionId)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCollectionAsItem(collectionId, { states: ['OPEN', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollectionAsItem(collectionId, { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCollectionAsItem(collectionId, { notStates: ['INVALID', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollectionAsItem(collectionId, { notStates: ['OPEN', 'FULFILLED'] })
    expect(listings.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getListingMockById(id))
    let listings = await getListingsForCollectionAsItem(collectionId, { includeExpired: true })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollectionAsItem(collectionId, { includeExpired: false })
    expect(listings.length).toBe(0)
    listings = await getListingsForCollectionAsItem(collectionId)
    expect(listings.length).toBe(0)
  })
})
