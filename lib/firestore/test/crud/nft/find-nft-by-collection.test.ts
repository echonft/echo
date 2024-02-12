import { findNftByCollection } from '@echo/firestore/crud/nft/find-nft-by-collection'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftByCollection', () => {
  const collectionId = '1aomCtnoesD7WVll6Yi1'
  it('returns undefined if the token id is not found', async () => {
    const nft = await findNftByCollection(collectionId, 1)
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given collection and token id', async () => {
    const nft = await findNftByCollection(collectionId, 1376)
    expect(nft).toStrictEqual(getNftMockById('8hHFadIrrooORfTOLkBg'))
  })
})
