import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import type { DocumentChange } from 'firebase-admin/firestore'

export function listenToOfferUpdates(onChange: (changeType: DocumentChangeType, update: OfferUpdate) => unknown) {
  getOfferUpdatesCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change: DocumentChange<OfferUpdate, OfferUpdate>) => {
      onChange(change.type, change.doc.data())
    })
  })
}
