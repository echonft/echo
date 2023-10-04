import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getOffersCollection() {
  return firestoreApp().collection(CollectionName.OFFERS).withConverter(offerDataConverter)
}
