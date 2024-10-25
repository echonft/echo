import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNftById', () => {
  it('returns undefined if the nft is not found', async () => {
    const nft = await getNftById('not-found')
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given id', async () => {
    const nft = await getNftById('BhHFadIrrooORfTOLkBg')
    expect(nft).toStrictEqual(nftMockSpiral1)
  })
})
