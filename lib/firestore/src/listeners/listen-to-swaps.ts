import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { type DocumentChange, type DocumentChangeType, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function listenToSwaps(
  onChange: (changeType: DocumentChangeType, snapshot: QueryDocumentSnapshot<Swap>) => unknown
) {
  getSwapsCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change: DocumentChange<Swap, Swap>) => {
      if (!isNil(change.doc?.id)) {
        onChange(change.type, change.doc)
      }
    })
  })
}
