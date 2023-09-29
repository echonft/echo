import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function getListingOfferSnapshotById(id: string) {
  const querySnapshot = await firestoreApp().collection(CollectionName.LISTING_OFFERS).where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot as QuerySnapshot<FirestoreListingOffer>)
}
