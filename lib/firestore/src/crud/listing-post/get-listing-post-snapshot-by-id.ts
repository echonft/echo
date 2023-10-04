import { getListingPostsCollection } from '@echo/firestore/helpers/collection/get-listing-posts-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getListingPostSnapshotById(id: string) {
  const querySnapshot = await getListingPostsCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
