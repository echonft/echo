import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { assertListings } from '@echo/firestore-test/listing/assert-listings'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { LISTING_STATE_FULFILLED } from '@echo/model/constants/listing-states'
import { collectionMockPxSlug, collectionMockSpiralSlug } from '@echo/model-mocks/collection/collection-mock'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model-mocks/listing/listing-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getPendingListingsForCollection', () => {
  beforeAll(async () => {
    await assertListings()
  })
  afterAll(async () => {
    await unchecked_updateListing(listingMockId(), { state: getListingMockById(listingMockId()).state })
    await assertListings()
  })
  it('returns an empty array if the collection does not exist', async () => {
    const listings = await getPendingListingsForCollection('not-found')
    expect(listings).toEqual([])
  })
  it('returns the pending listings for which the collection is included in the targets or items', async () => {
    let listings = await getPendingListingsForCollection(collectionMockPxSlug())
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById(listingMockId()))
    listings = await getPendingListingsForCollection(collectionMockSpiralSlug())
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById(listingMockId()))
    await unchecked_updateListing(listingMockId(), { state: LISTING_STATE_FULFILLED })
    listings = await getPendingListingsForCollection(collectionMockPxSlug())
    expect(listings).toEqual([])
    listings = await getPendingListingsForCollection(collectionMockSpiralSlug())
    expect(listings).toEqual([])
  })
})
