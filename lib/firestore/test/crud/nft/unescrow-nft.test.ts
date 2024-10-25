import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getEscrowedNftById } from '@echo/firestore/crud/nft/get-escrowed-nft-by-id'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { unescrowNft } from '@echo/firestore/crud/nft/unescrow-nft'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import { resetNft } from '@echo/test/firestore/crud/nft/reset-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - nft - unescrowNft', () => {
  let nft: Nullable<OwnedNft>
  beforeEach(() => {
    nft = undefined
  })
  afterEach(async () => {
    if (!isNil(nft)) {
      await resetNft(nft)
    }
  })
  it('throws if the NFT does not exist', async () => {
    await expect(unescrowNft('not-found')).rejects.toEqual(Error(NftError.NotFound))
  })
  it('throws if the NFT is not in escrow', async () => {
    await expect(unescrowNft('BhHFadIrrooORfTOLkBg')).rejects.toEqual(Error(NftError.NotInEscrow))
  })
  it('deletes the escrowed NFT and sets back the original NFT owner', async () => {
    // add the escrowed nft
    nft = nftMockSpiral1
    const escrowedNftId = await escrowNft(nft)
    // remove the NFT from escrow
    await unescrowNft('BhHFadIrrooORfTOLkBg')
    const updatedNft = await getNftById('BhHFadIrrooORfTOLkBg')
    expect(updatedNft).toBeDefined()
    expect(updatedNft).toStrictEqual(nft)
    const escrowedNftSnapshot = await getEscrowedNftById(escrowedNftId)
    expect(escrowedNftSnapshot).toBeUndefined()
  })
})
