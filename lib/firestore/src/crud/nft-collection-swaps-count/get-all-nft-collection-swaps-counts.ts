import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function getAllNftCollectionSwapsCounts() {
  const querySnapshot = await firestoreApp().collection(CollectionName.NFT_COLLECTION_SWAPS_COUNT).get()
  return getQuerySnapshotDocumentsData(querySnapshot as QuerySnapshot<FirestoreNftCollectionSwapsCount>)
}
