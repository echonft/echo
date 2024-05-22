import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNft', () => {
  const slug = 'spiral-frequencies'
  it('returns undefined if the token id is not found', async () => {
    const nft = await getNft({ collection: { slug }, tokenId: 1 })
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given collection and token id', async () => {
    const nft = await getNft({ collection: { slug }, tokenId: 1376 })
    expect(nft).toStrictEqual(getNftMockById('8hHFadIrrooORfTOLkBg'))
  })
})
