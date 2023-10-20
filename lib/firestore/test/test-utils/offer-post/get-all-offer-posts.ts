import { getOfferPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-posts-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllOfferPosts() {
  const querySnapshot = await getOfferPostsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
