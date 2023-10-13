import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getSwapsCollection() {
  return firestoreApp().collection(CollectionName.SWAPS) as CollectionReference<Swap>
}
