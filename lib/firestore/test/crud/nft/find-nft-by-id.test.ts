import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { nftMock } from '@echo/model-mocks/nft/nft-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftById', () => {
  it('returns undefined if the nft is not found', async () => {
    const nft = await findNftById('not-found')
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given id', async () => {
    const collection = await findNftById('8hHFadIrrooORfTOLkBg')
    expect(collection).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})
