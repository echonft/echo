import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getEscrowedNftById } from '@echo/firestore/crud/nft/get-escrowed-nft-by-id'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { escrowedNftsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'
import { nftDocumentMockSpiral1 } from '@echo/firestore/mocks/nft-document-mock'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import { resetNft } from '@echo/test/firestore/crud/nft/reset-nft'
import { nftDocumentMockSpiral1Id } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, dissoc, isNil } from 'ramda'

describe('CRUD - nft - escrowNft', () => {
  let escrowedNftId: Nullable<string>
  let nft: Nullable<OwnedNft>
  beforeEach(() => {
    nft = undefined
    escrowedNftId = undefined
  })
  afterEach(async () => {
    if (!isNil(escrowedNftId)) {
      await deleteReference({
        collectionReference: escrowedNftsCollection(),
        id: escrowedNftId
      })
    }
    if (!isNil(nft)) {
      await resetNft(nft)
    }
  })
  it('throws if the NFT does not exist', async () => {
    const nft = assoc('tokenId', 0, nftMockSpiral1)
    await expect(escrowNft(nft)).rejects.toEqual(Error(NftError.NotFound))
  })
  it('throws if the NFT is already in escrow', async () => {
    nft = nftMockSpiral1
    escrowedNftId = await escrowNft(nft)
    await expect(escrowNft(nft)).rejects.toEqual(Error(NftError.AlreadyInEscrow))
  })
  it('throws if the NFT does not have an owner', async () => {
    nft = nftMockSpiral1
    await removeNftOwner(nft)
    await expect(escrowNft(nft)).rejects.toEqual(Error(NftError.NoOwner))
  })
  it('adds the escrowed NFT and removes the NFT owner', async () => {
    nft = nftDocumentMockSpiral1 as OwnedNft
    escrowedNftId = await escrowNft(nft)
    const updatedNft = await getNftByIndex(nft)
    expect(updatedNft).toBeDefined()
    expect(updatedNft).toStrictEqual(dissoc('owner', nft))
    const escrowedNft = await getEscrowedNftById(escrowedNftId)
    expect(escrowedNft).toStrictEqual({
      nftId: nftDocumentMockSpiral1Id,
      owner: nft.owner
    })
  })
})
