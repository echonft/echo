import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import { deleteNft } from '@echo/test/firestore/crud/nft/delete-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, dissoc, isNil, pipe } from 'ramda'

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
    const originalNft = getNftMock()
    await expect(addNft(originalNft)).rejects.toEqual(Error(NftError.Exists))
  })

  it('adds the nft', async () => {
    const data = pipe(getNftMock, assoc('tokenId', 999))()
    const document = await addNft(data)
    nftId = document.id
    const nft = (await getNftById(nftId))!
    expect(dissoc('tokenIdLabel', nft)).toStrictEqual(dissoc('tokenIdLabel', data))
    expect(nft.tokenIdLabel).toBe('#0999')
  })
})
