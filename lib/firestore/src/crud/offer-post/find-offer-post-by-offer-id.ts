import { getOfferPostsCollection } from '@echo/firestore/helpers/collection/get-offer-posts-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findOfferPostByOfferId(offerId: string) {
  const querySnapshot = await getOfferPostsCollection().where('offerId', '==', offerId).get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
