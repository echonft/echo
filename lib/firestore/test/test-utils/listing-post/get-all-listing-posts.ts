import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'

export async function getAllListingPosts() {
  const querySnapshot = await getListingPostsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
