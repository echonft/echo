import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNftById', () => {
  it('returns undefined if the nft is not found', async () => {
    const nft = await getNftById('not-found')
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given id', async () => {
    const collection = await getNftById(nftMockSpiralJohnnyId())
    expect(collection).toStrictEqual(getNftMockById(nftMockSpiralJohnnyId()))
  })
})
