import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type Swap } from '@echo/firestore/types/model/swap/swap'
import { type CollectionReference } from 'firebase-admin/lib/firestore'

export function getSwapsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.SWAPS) as CollectionReference<Swap>
}
