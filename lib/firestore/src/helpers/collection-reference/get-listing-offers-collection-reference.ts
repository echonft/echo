import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { CollectionReference } from 'firebase-admin/firestore'

export function getListingOffersCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.LISTING_OFFERS) as CollectionReference<ListingOffer>
}
