import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { COLLECTION_MOCK_SPIRAL_SLUG } from '@echo/model-mocks/collection/collection-mock'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NFT_MOCK_SPIRAL_JOHNNY_ID } from '@echo/model-mocks/nft/nft-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNft', () => {
  const slug = COLLECTION_MOCK_SPIRAL_SLUG
  it('returns undefined if the token id is not found', async () => {
    const nft = await getNft({ collection: { slug }, tokenId: 0 })
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given collection and token id', async () => {
    const nft = await getNft({ collection: { slug }, tokenId: 1 })
    expect(nft).toStrictEqual(getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID))
  })
})
