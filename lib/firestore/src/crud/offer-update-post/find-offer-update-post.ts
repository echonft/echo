import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'

export async function findOfferUpdatePost(offerUpdateId: string) {
  const querySnapshot = await getOfferUpdatePostsCollectionReference().where('offerUpdateId', '==', offerUpdateId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
