import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getAllNfts', () => {
  it('get all nfts', async () => {
    const nftMocks = getAllNftMocks()
    const nfts = await getAllNfts()
    expect(eqList(nfts, nftMocks)).toBeTruthy()
  })
})
