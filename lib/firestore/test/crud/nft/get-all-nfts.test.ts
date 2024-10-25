import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { nftDocumentMocks } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getAllNfts', () => {
  it('get all nfts', async () => {
    const nfts = await getAllNfts()
    expect(nfts).toEqualList(nftDocumentMocks)
  })
})
