import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllListingOffers() {
  const querySnapshot = await firestoreApp().collection(CollectionName.LISTING_OFFERS).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
