import { getCollectionNftsCount } from '@echo/firestore/crud/collection/counts/get-collection-nfts-count'
import { collectionMockPxSlug } from '@echo/model/mocks/collection/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - counts - getCollectionNftsCount', () => {
  it('returns 0 if there are no listings for the collection', async () => {
    const count = await getCollectionNftsCount('not-found')
    expect(count).toEqual(0)
  })

  it('returns the nft count for the collection', async () => {
    const collectionSlug = collectionMockPxSlug()
    const count = await getCollectionNftsCount(collectionSlug)
    expect(count).toEqual(3)
  })
})
