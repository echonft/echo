import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingPostDataConverter } from '@echo/firestore/converters/listing-post/listing-post-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getListingPostSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTING_POSTS)
    .withConverter(listingPostDataConverter)
    .where('id', '==', id)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
