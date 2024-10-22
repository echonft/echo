import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { collectionMockPxSlug, collectionMockSpiralSlug } from '@echo/model/mocks/collection/collection-mock'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId, listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { updateListing } from '@echo/test/firestore/crud/listing/update-listing'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getPendingListingsForCollection', () => {
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
    await updateListing(listingMockSlug(), { locked: true })
    listings = await getPendingListingsForCollection(collectionMockPxSlug())
    expect(listings).toEqual([])
    listings = await getPendingListingsForCollection(collectionMockSpiralSlug())
    expect(listings).toEqual([])
  })
})
