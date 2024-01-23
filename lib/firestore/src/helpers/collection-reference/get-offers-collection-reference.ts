import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { Offer } from '@echo/model/types/offer'

export function getOffersCollectionReference() {
  return firestoreApp()
    .collection(CollectionReferenceName.OFFERS)
    .withConverter<Offer, OfferDocumentData>(offerDataConverter)
}
