import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { escrowNft, EscrowNftError } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import { assertNfts } from '@echo/firestore/utils/nft/assert-nfts'
import { unchecked_updateNft } from '@echo/firestore/utils/nft/unchecked_update-nft'
import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import type { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'
import { assoc, invoker, isNil, omit, pipe } from 'ramda'

describe('CRUD - nft - escrowNft', () => {
  let escrowedNftId: Nullable<string>
  let nftId: Nullable<string>
  beforeAll(async () => {
    await assertNfts()
  })
  afterAll(async () => {
    await assertNfts()
  })
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(escrowedNftId)) {
      await deleteReference({
        collectionReference: getEscrowedNftsCollectionReference(),
        id: escrowedNftId
      })
    }
    if (!isNil(nftId)) {
      await unchecked_updateNft(getNftMockById(nftId))
    }
  })
  it('throws if the NFT does not exist', async () => {
    const nft = pipe(getNftMock, assoc('tokenId', 0))()
    await expect(escrowNft(nft)).rejects.toEqual(Error(NftError.NFT_NOT_FOUND))
  })
  it('adds the escrowed NFT and removes the NFT owner', async () => {
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    escrowedNftId = await escrowNft(nft)
    const updatedNft = await getNftById(nftId)
    expect(updatedNft).toBeDefined()
    expect(omit(['updatedAt'], updatedNft!)).toStrictEqual(
      pipe<[OwnedNft], Nft, Omit<Nft, 'updatedAt'>>(assoc('owner', undefined), omit(['updatedAt']))(nft)
    )
    const escrowedNft = await pipe<
      [GetReferenceByIdArgs<EscrowedNft>],
      DocumentReference<EscrowedNft>,
      Promise<DocumentSnapshot<EscrowedNft, EscrowedNft>>
    >(
      getReferenceById<EscrowedNft>,
      invoker(0, 'get')
    )({ collectionReference: getEscrowedNftsCollectionReference(), id: escrowedNftId })
    expect(escrowedNft.exists).toBeTruthy()
    expect(escrowedNft.data()).toStrictEqual({
      nftId,
      owner: nft.owner
    })
  })
  it('throws if the NFT is already in escrow', async () => {
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    escrowedNftId = await escrowNft(nft)
    await expect(escrowNft(nft)).rejects.toEqual(Error(EscrowNftError.NFT_ALREADY_IN_ESCROW))
  })
})
