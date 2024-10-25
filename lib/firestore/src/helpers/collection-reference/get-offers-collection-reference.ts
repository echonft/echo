import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { Offer } from '@echo/model/types/offer'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getOffersCollectionReference(): CollectionReference<Offer, OfferDocumentData> {
  return firestoreApp()
    .collection(CollectionReferenceName.Offers)
    .withConverter<Offer, OfferDocumentData>(offerDataConverter)
}
