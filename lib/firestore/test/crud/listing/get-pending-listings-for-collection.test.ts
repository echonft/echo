import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { updateListing } from '@echo/test/firestore/crud/listing/update-listing'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getPendingListingsForCollection', () => {
  it('returns an empty array if the collection does not exist', async () => {
    const listings = await getPendingListingsForCollection('not-found')
    expect(listings).toEqual([])
  })
  it('returns the pending listings for which the collection is included in the targets or items', async () => {
    let listings = await getPendingListingsForCollection(collectionMockPx.slug)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(listingMock)
    listings = await getPendingListingsForCollection(collectionMockSpiral.slug)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(listingMock)
    await updateListing(listingMock.slug, { locked: true })
    listings = await getPendingListingsForCollection(collectionMockPx.slug)
    expect(listings).toEqual([])
    listings = await getPendingListingsForCollection(collectionMockSpiral.slug)
    expect(listings).toEqual([])
  })
})
