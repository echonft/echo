import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { unescrowNft, UnescrowNftError } from '@echo/firestore/crud/nft/unescrow-nft'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import { assertNfts } from '@echo/firestore/utils/nft/assert-nfts'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import type { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'
import { invoker, omit, pipe } from 'ramda'

describe('CRUD - nft - unescrowNft', () => {
  beforeAll(async () => {
    await assertNfts()
  })
  afterAll(async () => {
    await assertNfts()
  })
  it('throws if the NFT does not exist', async () => {
    await expect(unescrowNft('not-found')).rejects.toEqual(Error(UnescrowNftError.NFT_NOT_FOUND))
  })
  it('throws if the NFT is not in escrow', async () => {
    await expect(unescrowNft(nftMockSpiralJohnnyId())).rejects.toEqual(Error(UnescrowNftError.NFT_NOT_IN_ESCROW))
  })
  it('deletes the escrowed NFT and sets back the original NFT owner', async () => {
    // add the escrowed nft
    const nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    const escrowedNftId = await escrowNft(nft)
    // remove the NFT from escrow
    await unescrowNft(nftId)
    const updatedNft = await getNftById(nftId)
    expect(updatedNft).toBeDefined()
    expect(omit(['updatedAt'], updatedNft!)).toStrictEqual(omit(['updatedAt'], nft))
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
