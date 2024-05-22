import { getAllNfts } from '@echo/firestore-test/nft/get-all-nfts'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { contentEq } from '@echo/utils/fp/content-eq'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getAllNfts', () => {
  it('get all nfts', async () => {
    const nftMocks = getAllNftMocks()
    const nfts = await getAllNfts()
    expect(contentEq(nfts, nftMocks)).toBeTruthy()
  })
})
