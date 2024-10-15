import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getListingOffersCollectionReference(): CollectionReference<
  ListingOfferDocumentData,
  ListingOfferDocumentData
> {
  return firestoreApp().collection(CollectionReferenceName.ListingOffers) as CollectionReference<
    ListingOfferDocumentData,
    ListingOfferDocumentData
  >
}
