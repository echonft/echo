import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { type Offer } from '@echo/model/types/offer'
import type { DocumentChange } from 'firebase-admin/firestore'

export function listenToOffers(onChange: (changeType: DocumentChangeType, offer: Offer) => unknown) {
  getOffersCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change: DocumentChange<Offer, OfferDocumentData>) => {
      onChange(change.type, change.doc.data())
    })
  })
}
