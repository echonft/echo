import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { collectionMockSpiralSlug } from '@echo/model/mocks/collection/collection-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNft', () => {
  const slug = collectionMockSpiralSlug()
  it('returns undefined if the token id is not found', async () => {
    const nft = await getNftByIndex({ collection: { slug }, tokenId: 0 })
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given collection and token id', async () => {
    const nft = await getNftByIndex({ collection: { slug }, tokenId: 1 })
    expect(nft).toStrictEqual(getNftMockById(nftMockSpiralJohnnyId()))
  })
})
