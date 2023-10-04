import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'

export function listenToOffers(onChange: (changeType: DocumentChangeType, offer: FirestoreOffer) => unknown) {
  return getOffersCollection().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      onChange(change.type, change.doc.data())
    })
  })
}
