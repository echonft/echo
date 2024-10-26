import { getCollectionCounts } from '@echo/firestore/crud/collection/get-collection-counts'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getCollectionWithCounts', () => {
  it('returns the offer count for the collection', async () => {
    const collectionSlug = collectionMockPx.slug
    const collectionWithCounts = await getCollectionCounts(collectionSlug)
    expect(collectionWithCounts.listingsCount).toEqual(1)
    expect(collectionWithCounts.nftsCount).toEqual(3)
    expect(collectionWithCounts.offersCount).toEqual(2)
    expect(collectionWithCounts.swapsCount).toEqual(0)
  })
})
