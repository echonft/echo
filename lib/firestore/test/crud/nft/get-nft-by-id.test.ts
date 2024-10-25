import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { nftDocumentMockSpiral1 } from '@echo/firestore/mocks/nft-document-mock'
import { nftDocumentMockSpiral1Id } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNftById', () => {
  it('returns undefined if the nft is not found', async () => {
    const nft = await getNftById('not-found')
    expect(nft).toBeUndefined()
  })
  it('returns the nft with the given id', async () => {
    const nft = await getNftById(nftDocumentMockSpiral1Id)
    expect(nft).toStrictEqual(nftDocumentMockSpiral1)
  })
})
