import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { CollectionReference } from 'firebase-admin/firestore'

export function getCollectionSwapsCountCollectionReference(): CollectionReference<
  CollectionSwapsCount,
  CollectionSwapsCount
> {
  return firestoreApp().collection(CollectionReferenceName.COLLECTION_SWAPS_COUNT) as CollectionReference<
    CollectionSwapsCount,
    CollectionSwapsCount
  >
}
