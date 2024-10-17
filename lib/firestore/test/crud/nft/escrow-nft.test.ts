import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/escrowed-nft-document-data'
import { resetNft } from '@echo/firestore/utils/nft/reset-nft'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import type { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, assoc, invoker, isNil, pipe } from 'ramda'

describe('CRUD - nft - escrowNft', () => {
  let escrowedNftId: Nullable<string>
  let nftId: Nullable<string>
  beforeEach(() => {
    nftId = undefined
    escrowedNftId = undefined
  })
  afterEach(async () => {
    if (!isNil(escrowedNftId)) {
      await deleteReference({
        collectionReference: getEscrowedNftsCollectionReference(),
        id: escrowedNftId
      })
    }
    if (!isNil(nftId)) {
      const nft = getNftMockById(nftId)
      await resetNft(nft)
    }
  })
  it('throws if the NFT does not exist', async () => {
    const nft = pipe(getNftMock, assoc('tokenId', 0))()
    await expect(escrowNft(nft)).rejects.toEqual(Error(NftError.NotFound))
  })
  it('throws if the NFT is already in escrow', async () => {
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    escrowedNftId = await escrowNft(nft)
    await expect(escrowNft(nft)).rejects.toEqual(Error(NftError.AlreadyInEscrow))
  })
  it('throws if the NFT does not have an owner', async () => {
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    await removeNftOwner(nft)
    await expect(escrowNft(nft)).rejects.toEqual(Error(NftError.NoOwner))
  })
  it('adds the escrowed NFT and removes the NFT owner', async () => {
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    escrowedNftId = await escrowNft(nft)
    const updatedNft = await getNftById(nftId)
    expect(updatedNft).toBeDefined()
    expect(updatedNft).toStrictEqual(assoc('owner', undefined, nft))
    const escrowedNft = await pipe<
      [GetReferenceByIdArgs<EscrowedNftDocumentData, EscrowedNftDocumentData>],
      Promise<DocumentReference<EscrowedNftDocumentData, EscrowedNftDocumentData>>,
      Promise<DocumentSnapshot<EscrowedNftDocumentData, EscrowedNftDocumentData>>
    >(
      getReferenceById,
      andThen(invoker(0, 'get'))
    )({ collectionReference: getEscrowedNftsCollectionReference(), id: escrowedNftId })
    expect(escrowedNft.exists).toBeTruthy()
    expect(escrowedNft.data()).toStrictEqual({
      nftId,
      owner: nft.owner
    })
  })
})
