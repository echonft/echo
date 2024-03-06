import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { DocumentChange } from 'firebase-admin/firestore'

export function listenToSwaps(onChange: (changeType: DocumentChangeType, swap: Swap) => unknown) {
  getSwapsCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change: DocumentChange<Swap, Swap>) => {
      onChange(change.type, change.doc.data())
    })
  })
}
