import { getCollectionCounts } from '@echo/firestore/crud/collection/counts/get-collection-counts'
import { collectionMockPxSlug } from '@echo/model/mocks/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - counts - getCollectionWithCounts', () => {
  it('returns the offer count for the collection', async () => {
    const collectionSlug = collectionMockPxSlug()
    const collectionWithCounts = await getCollectionCounts(collectionSlug)
    expect(collectionWithCounts.listingsCount).toEqual(1)
    expect(collectionWithCounts.nftsCount).toEqual(3)
    expect(collectionWithCounts.offersCount).toEqual(2)
    expect(collectionWithCounts.swapsCount).toEqual(0)
  })
})
