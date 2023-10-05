import { getListingPostsCollection } from '@echo/firestore/helpers/collection/get-listing-posts-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findListingPostByListingId(listingId: string) {
  const querySnapshot = await getListingPostsCollection().where('listingId', '==', listingId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
