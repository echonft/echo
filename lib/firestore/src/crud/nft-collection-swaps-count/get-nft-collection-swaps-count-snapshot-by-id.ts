import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function getNftCollectionSwapsCountSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTION_SWAPS_COUNT)
    .where('id', '==', id)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot as QuerySnapshot<FirestoreNftCollectionSwapsCount>)
}
