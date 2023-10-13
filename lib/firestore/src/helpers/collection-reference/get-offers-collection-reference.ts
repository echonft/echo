import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getOffersCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.OFFERS).withConverter(offerDataConverter)
}
