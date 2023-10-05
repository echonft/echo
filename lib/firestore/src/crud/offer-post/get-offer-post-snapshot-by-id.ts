import { getOfferPostsCollection } from '@echo/firestore/helpers/collection/get-offer-posts-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getOfferPostSnapshotById(id: string) {
  const querySnapshot = await getOfferPostsCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
