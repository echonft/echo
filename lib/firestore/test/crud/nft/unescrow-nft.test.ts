import { ReferenceError } from '@echo/firestore/constants/errors/reference-error'
import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { unescrowNft } from '@echo/firestore/crud/nft/unescrow-nft'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/escrowed-nft-document-data'
import { resetNft } from '@echo/firestore/utils/nft/reset-nft'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import type { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, invoker, isNil, pipe } from 'ramda'

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
    await expect(unescrowNft('not-found')).rejects.toEqual(Error(ReferenceError.NotFound))
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
    const escrowedNftSnapshot = await pipe<
      [GetReferenceByIdArgs<EscrowedNftDocumentData, EscrowedNftDocumentData>],
      Promise<DocumentReference<EscrowedNftDocumentData, EscrowedNftDocumentData>>,
      Promise<DocumentSnapshot<EscrowedNftDocumentData, EscrowedNftDocumentData>>
    >(
      getReferenceById,
      andThen(invoker(0, 'get'))
    )({
      collectionReference: getEscrowedNftsCollectionReference(),
      id: escrowedNftId,
      options: { skipExistsCheck: true }
    })
    expect(escrowedNftSnapshot.exists).toBeFalsy()
  })
})
