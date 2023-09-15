import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export async function getNftSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFTS)
    .where('id', '==', id)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreNft>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
