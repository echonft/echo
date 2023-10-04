import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getSwapsCollection() {
  return firestoreApp().collection(CollectionName.SWAPS) as CollectionReference<FirestoreSwap>
}
