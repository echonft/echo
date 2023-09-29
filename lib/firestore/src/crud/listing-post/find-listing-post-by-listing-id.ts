import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingPostDataConverter } from '@echo/firestore/converters/listing-post/listing-post-data-converter'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findListingPostByListingId(listingId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTING_POSTS)
    .withConverter(listingPostDataConverter)
    .where('listingId', '==', listingId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
