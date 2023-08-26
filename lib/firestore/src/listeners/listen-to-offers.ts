import { CollectionName } from '../constants/collection-name'
import { offerDataConverter } from '../converters/offer-data-converter'
import { firestore } from '../services/firestore'
import { DocumentChangeType } from '../types/abstract/document-change-type'
import { Offer } from '../types/model/offer'

export function listenToOffers(onChange: (changeType: DocumentChangeType, offer: Offer) => unknown) {
  return firestore()
    .collection(CollectionName.OFFERS)
    .withConverter(offerDataConverter)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        onChange(change.type, change.doc.data())
      })
    })
}
