import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftReferenceById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import type { Nft } from '@echo/model/types/nft'
import { type DocumentReference, type DocumentSnapshot } from 'firebase-admin/firestore'
import { invoker, isNil, pipe } from 'ramda'

export enum UnescrowNftError {
  NFT_NOT_IN_ESCROW = 'NFT is not in escrow'
}

export async function unescrowNft(nftId: string): Promise<Nft> {
  const snapshot = await pipe<[string], DocumentReference<Nft>, Promise<DocumentSnapshot<Nft, Nft>>>(
    getNftReferenceById,
    invoker(0, 'get')
  )(nftId)
  if (!snapshot.exists) {
    return Promise.reject(Error(NftError.NOT_FOUND))
  }
  const nft = snapshot.data()
  if (isNil(nft)) {
    return Promise.reject(Error(NftError.NOT_FOUND))
  }
  const escrowedNftSnapshot = await getEscrowedNftSnapshot(snapshot.id)
  if (isNil(escrowedNftSnapshot)) {
    return Promise.reject(Error(UnescrowNftError.NFT_NOT_IN_ESCROW))
  }
  const escrowedNft = escrowedNftSnapshot.data()
  if (isNil(escrowedNft)) {
    return Promise.reject(Error(UnescrowNftError.NFT_NOT_IN_ESCROW))
  }
  // delete escrowed NFT
  await deleteReference<EscrowedNft>({
    collectionReference: getEscrowedNftsCollectionReference(),
    id: escrowedNftSnapshot.id
  })
  // add back NFT owner
  return await setNftOwner({ nft, owner: escrowedNft.owner })
}
