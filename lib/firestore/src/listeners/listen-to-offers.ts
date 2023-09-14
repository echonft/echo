import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreOfferComplete } from '@echo/firestore/types/model/firestore-offer-complete'

export function listenToOffers(onChange: (changeType: DocumentChangeType, offer: FirestoreOfferComplete) => unknown) {
  return firestoreApp()
    .collection(CollectionName.OFFERS)
    .withConverter(offerDataConverter)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        onChange(change.type, change.doc.data() as FirestoreOfferComplete)
      })
    })
}
