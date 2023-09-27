import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllListings() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .withConverter(listingDataConverter)
    .get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
