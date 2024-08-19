import { getCollectionCounts } from '@echo/firestore/crud/collection-with-counts/get-collection-counts'
import { collectionMockPxSlug } from '@echo/model/mocks/collection/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('getCollectionWithCounts', () => {
  it('returns the offer count for the collection', async () => {
    const collectionSlug = collectionMockPxSlug()
    const collectionWithCounts = await getCollectionCounts(collectionSlug)
    expect(collectionWithCounts.listingsCount).toEqual(1)
    expect(collectionWithCounts.nftsCount).toEqual(3)
    expect(collectionWithCounts.offersCount).toEqual(1)
    expect(collectionWithCounts.swapsCount).toEqual(1)
  })
})
