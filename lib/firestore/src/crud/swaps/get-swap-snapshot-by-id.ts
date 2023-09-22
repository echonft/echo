import { CollectionName } from '@echo/firestore/constants/collection-name'
import { swapDataConverter } from '@echo/firestore/converters/swap/swap-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getSwapSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SWAPS)
    .withConverter(swapDataConverter)
    .where('id', '==', id)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreSwap>
}
