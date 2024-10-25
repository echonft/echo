import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getAllNfts', () => {
  it('get all nfts', async () => {
    const nfts = await getAllNfts()
    expect(eqList(nfts, nftMocks)).toBeTruthy()
  })
})
