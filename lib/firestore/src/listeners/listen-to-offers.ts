import { CollectionName } from '../constants/collection-name'
import { offerDataConverter } from '../converters/offer-data-converter'
import { firestore } from '../services/firestore'
import { DocumentChangeType, OfferComplete } from '@echo/firestore-types'

export function listenToOffers(onChange: (changeType: DocumentChangeType, offer: OfferComplete) => unknown) {
  return firestore()
    .collection(CollectionName.OFFERS)
    .withConverter(offerDataConverter)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        onChange(change.type, change.doc.data() as OfferComplete)
      })
    })
}
