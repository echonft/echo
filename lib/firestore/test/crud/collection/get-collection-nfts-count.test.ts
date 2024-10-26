import { getCollectionNftsCount } from '@echo/firestore/crud/collection/get-collection-nfts-count'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getCollectionNftsCount', () => {
  it('returns 0 if there are no listings for the collection', async () => {
    const count = await getCollectionNftsCount('not-found')
    expect(count).toEqual(0)
  })

  it('returns the nft count for the collection', async () => {
    const collectionSlug = collectionMockPx.slug
    const count = await getCollectionNftsCount(collectionSlug)
    expect(count).toEqual(3)
  })
})
