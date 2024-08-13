import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { unescrowNft, UnescrowNftError } from '@echo/firestore/crud/nft/unescrow-nft'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import { updateNft } from '@echo/firestore/utils/nft/update-nft'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import type { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'
import { invoker, isNil, pipe } from 'ramda'

describe('CRUD - nft - unescrowNft', () => {
  let nftId: Nullable<string>
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(nftId)) {
      const nft = getNftMockById(nftId)
      await updateNft(nft, nft)
    }
  })
  it('throws if the NFT does not exist', async () => {
    await expect(unescrowNft('not-found')).rejects.toEqual(Error(NftError.NOT_FOUND))
  })
  it('throws if the NFT is not in escrow', async () => {
    await expect(unescrowNft(nftMockSpiralJohnnyId())).rejects.toEqual(Error(UnescrowNftError.NFT_NOT_IN_ESCROW))
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
      [GetReferenceByIdArgs<EscrowedNft>],
      DocumentReference<EscrowedNft>,
      Promise<DocumentSnapshot<EscrowedNft, EscrowedNft>>
    >(
      getReferenceById<EscrowedNft>,
      invoker(0, 'get')
    )({ collectionReference: getEscrowedNftsCollectionReference(), id: escrowedNftId })
    expect(escrowedNftSnapshot.exists).toBeFalsy()
  })
})
