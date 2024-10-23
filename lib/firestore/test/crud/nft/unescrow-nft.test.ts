import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getEscrowedNftById } from '@echo/firestore/crud/nft/get-escrowed-nft-by-id'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { unescrowNft } from '@echo/firestore/crud/nft/unescrow-nft'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { resetNft } from '@echo/test/firestore/crud/nft/reset-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - nft - unescrowNft', () => {
  let nftId: Nullable<string>
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(nftId)) {
      const nft = getNftMockById(nftId)
      await resetNft(nft)
    }
  })
  it('throws if the NFT does not exist', async () => {
    await expect(unescrowNft('not-found')).rejects.toEqual(Error(NftError.NotFound))
  })
  it('throws if the NFT is not in escrow', async () => {
    await expect(unescrowNft(nftMockSpiralJohnnyId())).rejects.toEqual(Error(NftError.NotInEscrow))
  })
  it('deletes the escrowed NFT and sets back the original NFT owner', async () => {
    // add the escrowed nft
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    const escrowedNftId = await escrowNft(nft)
    // remove the NFT from escrow
    await unescrowNft(nftId)
    const updatedNft = await getNftById(nftId)
    expect(updatedNft).toBeDefined()
    expect(updatedNft).toStrictEqual(nft)
    const escrowedNftSnapshot = await getEscrowedNftById(escrowedNftId)
    expect(escrowedNftSnapshot).toBeUndefined()
  })
})
