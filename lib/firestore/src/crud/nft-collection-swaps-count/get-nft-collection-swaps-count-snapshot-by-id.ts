import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getNftCollectionSwapsCountSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTION_SWAPS_COUNT)
    .where('id', '==', id)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreNftCollectionSwapsCount>
}
