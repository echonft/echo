import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import type { Nft } from '@echo/model/types/nft'
import { firestore } from 'firebase-admin'
import DocumentSnapshot = firestore.DocumentSnapshot

export async function getNftSnapshotById(id: string): Promise<undefined | DocumentSnapshot<Nft, Nft>> {
  const documentSnapshot = await getNftsCollectionReference().doc(id).get()
  if (!documentSnapshot.exists) {
    return undefined
  }
  return documentSnapshot
}
