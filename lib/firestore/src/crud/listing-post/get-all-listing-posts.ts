import { getListingPostsCollection } from '@echo/firestore/helpers/collection/get-listing-posts-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllListingPosts() {
  const querySnapshot = await getListingPostsCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
