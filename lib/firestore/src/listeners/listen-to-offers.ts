import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { type Offer } from '@echo/model/types/offer'
import { type DocumentChange, type DocumentChangeType, type QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function listenToOffers(
  onChange: (changeType: DocumentChangeType, snapshot: QueryDocumentSnapshot<Offer>) => unknown
) {
  getOffersCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change: DocumentChange<Offer, OfferDocumentData>) => {
      onChange(change.type, change.doc)
    })
  })
}
