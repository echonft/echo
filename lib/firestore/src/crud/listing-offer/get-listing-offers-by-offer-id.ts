import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function getListingOffersByOfferId(offerId: string): Promise<FirestoreListingOffer[]> {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTING_OFFERS)
    .where('offerId', '==', offerId)
    .get()

  return getQuerySnapshotDocumentsData(querySnapshot as QuerySnapshot<FirestoreListingOffer>)
}
