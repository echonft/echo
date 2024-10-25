import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { nftDocumentMockSpiral1 } from '@echo/firestore/mocks/nft-document-mock'
import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNft', () => {
  const slug = collectionMockSpiral.slug
  it('returns undefined if the token id is not found', async () => {
    const nft = await getNftByIndex({ collection: { slug }, tokenId: 0 })
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given collection and token id', async () => {
    const nft = await getNftByIndex({
      collection: { slug: nftDocumentMockSpiral1.collection.slug },
      tokenId: nftDocumentMockSpiral1.tokenId
    })
    expect(nft).toStrictEqual(nftDocumentMockSpiral1)
  })
})
