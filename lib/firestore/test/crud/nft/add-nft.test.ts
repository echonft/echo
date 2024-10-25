import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { nftDocumentMockSpiral1 } from '@echo/firestore/mocks/nft-document-mock'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { Nft } from '@echo/model/types/nft'
import { deleteNft } from '@echo/test/firestore/crud/nft/delete-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - nft - addNft', () => {
  let nftId: Nullable<string>
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(nftId)) {
      await deleteNft(nftId)
    }
  })

  it('throws if the nft already exists', async () => {
    await expect(addNft(nftMockSpiral1)).rejects.toEqual(Error(NftError.Exists))
  })

  it('adds the nft', async () => {
    const data = assoc('tokenId', 999, nftDocumentMockSpiral1)
    const document = await addNft(data as Nft)
    nftId = document.id
    const nft = await getNftById(nftId)
    expect(nft).toStrictEqual(data)
  })
})
