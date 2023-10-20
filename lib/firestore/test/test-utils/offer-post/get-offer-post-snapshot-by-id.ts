import { getOfferPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-posts-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getOfferPostSnapshotById(id: string) {
  const querySnapshot = await getOfferPostsCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
