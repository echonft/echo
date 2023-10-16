import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findListingPostByListingId(listingId: string) {
  const querySnapshot = await getListingPostsCollectionReference().where('listingId', '==', listingId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
