import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getListingOffersCollection() {
  return firestoreApp().collection(CollectionName.LISTING_OFFERS) as CollectionReference<FirestoreListingOffer>
}
