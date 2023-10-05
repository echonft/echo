import { getOfferPostsCollection } from '@echo/firestore/helpers/collection/get-offer-posts-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllOfferPosts() {
  const querySnapshot = await getOfferPostsCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
