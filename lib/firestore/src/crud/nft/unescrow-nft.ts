import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftReferenceById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/escrowed-nft-document-data'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import { NftError } from '@echo/model/constants/errors/nft-error'
import type { Nft } from '@echo/model/types/nft/nft'
import { type DocumentReference, type DocumentSnapshot } from 'firebase-admin/firestore'
import { invoker, isNil, pipe } from 'ramda'

export async function unescrowNft(nftId: string): Promise<Nft> {
  const snapshot = await pipe<
    [string],
    DocumentReference<Nft, NftDocumentData>,
    Promise<DocumentSnapshot<Nft, NftDocumentData>>
  >(
    getNftReferenceById,
    invoker(0, 'get')
  )(nftId)
  if (!snapshot.exists) {
    return Promise.reject(Error(NftError.NotFound))
  }
  const nft = snapshot.data()
  if (isNil(nft)) {
    return Promise.reject(Error(NftError.NotFound))
  }
  const escrowedNftSnapshot = await getEscrowedNftSnapshot(snapshot.id)
  if (isNil(escrowedNftSnapshot)) {
    return Promise.reject(Error(NftError.NotInEscrow))
  }
  const escrowedNft = escrowedNftSnapshot.data()
  if (isNil(escrowedNft)) {
    return Promise.reject(Error(NftError.NotInEscrow))
  }
  // delete escrowed NFT
  await deleteReference<EscrowedNftDocumentData, EscrowedNftDocumentData>({
    collectionReference: getEscrowedNftsCollectionReference(),
    id: escrowedNftSnapshot.id
  })
  // add back NFT owner
  return await setNftOwner({ nft, owner: escrowedNft.owner })
}
