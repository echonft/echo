import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingPostDataConverter } from '@echo/firestore/converters/listing-post/listing-post-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllListingPosts() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTING_POSTS)
    .withConverter(listingPostDataConverter)
    .get()

  return getQuerySnapshotDocumentsData(querySnapshot)
}
