import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import { type DocumentChange, type DocumentChangeType, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function listenToOfferUpdates(
  onChange: (changeType: DocumentChangeType, snapshot: QueryDocumentSnapshot<OfferUpdate>) => unknown
) {
  getOfferUpdatesCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change: DocumentChange<OfferUpdate, OfferUpdate>) => {
      if (!isNil(change.doc?.id)) {
        onChange(change.type, change.doc)
      }
    })
  })
}
