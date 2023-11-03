import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsForCollectionAsItem } from '@echo/firestore/crud/listing/get-listings-for-collection-as-item'
import { type Listing } from '@echo/model/types/listing'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { unchecked_updateListing } from '@test-utils/listing/unchecked_update-listing'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getListingsForCollectionAsItem', () => {
  const collectionId = '1aomCtnoesD7WVll6Yi1'
  const id = 'jUzMtPGKM62mMhEcmbN4'
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
    let listings = await getListingsForCollectionAsItem(collectionId, { states: ['OFFERS_PENDING', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollectionAsItem(collectionId, { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCollectionAsItem(collectionId, {
      notStates: ['PARTIALLY_FULFILLED', 'CANCELLED']
    })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollectionAsItem(collectionId, { notStates: ['OFFERS_PENDING', 'FULFILLED'] })
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
