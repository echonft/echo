import { getOfferPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-posts-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findOfferPostByOfferId(offerId: string) {
  const querySnapshot = await getOfferPostsCollectionReference().where('offerId', '==', offerId).get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
