import { CollectionName } from '@echo/firestore/constants/collection-name'
import { swapDataConverter } from '@echo/firestore/converters/swap/swap-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getAllSwaps() {
  const querySnapshot = await firestoreApp().collection(CollectionName.SWAPS).withConverter(swapDataConverter).get()
  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreSwap[]
  }
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreSwap[]
}
