import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getNftCollectionSwapsCountCollection() {
  return firestoreApp().collection(
    CollectionName.NFT_COLLECTION_SWAPS_COUNT
  ) as CollectionReference<CollectionSwapsCount>
}
