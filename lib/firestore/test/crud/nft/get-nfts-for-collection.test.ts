import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { collectionMockSpiralSlug } from '@echo/model/mocks/collection/collection-mock'
import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'
import { filter, pathEq, pipe } from 'ramda'

describe('CRUD - nft - getNftsForCollection', () => {
  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForCollection('not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the collection', async () => {
    const collectionSlug = collectionMockSpiralSlug()
    const nfts = await getNftsForCollection(collectionSlug)
    const nftMocks = pipe(getAllNftMocks, filter(pathEq(collectionSlug, ['collection', 'slug'])))()
    expect(eqList(nfts, nftMocks)).toBeTruthy()
  })
})
