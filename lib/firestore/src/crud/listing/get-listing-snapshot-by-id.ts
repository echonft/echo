import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getListingSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('id', '==', id)
    .withConverter(listingDataConverter)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
