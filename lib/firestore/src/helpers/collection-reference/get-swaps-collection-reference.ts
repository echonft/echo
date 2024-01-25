import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type Swap } from '@echo/firestore/types/model/swap/swap'
import { CollectionReference } from 'firebase-admin/firestore'

export function getSwapsCollectionReference(): CollectionReference<Swap> {
  return firestoreApp().collection(CollectionReferenceName.SWAPS) as CollectionReference<Swap>
}
