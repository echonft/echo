import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'
import { filter, pathEq } from 'ramda'

describe('CRUD - nft - getNftsForCollection', () => {
  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForCollection('not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the collection', async () => {
    const collectionSlug = collectionMockSpiral.slug
    const nfts = await getNftsForCollection(collectionSlug)
    const collectionNfts = filter(pathEq(collectionSlug, ['collection', 'slug']), nftMocks)
    expect(eqList(nfts, collectionNfts)).toBeTruthy()
  })
})
