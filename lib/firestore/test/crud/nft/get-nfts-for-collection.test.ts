import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { describe, expect, it } from '@jest/globals'
import { filter, pathEq, pipe } from 'ramda'

describe('CRUD - nft - getNftsForCollection', () => {
  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForCollection('not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the collection', async () => {
    const collectionSlug = 'spiral-frequencies'
    const nfts = await getNftsForCollection(collectionSlug)
    const nftMocks = pipe(getAllNftMocks, filter(pathEq(collectionSlug, ['collection', 'slug'])))()
    expect(eqListContent(nfts, nftMocks)).toBeTruthy()
  })
})
