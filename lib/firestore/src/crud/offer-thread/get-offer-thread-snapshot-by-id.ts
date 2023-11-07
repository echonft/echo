import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshot'

export async function getOfferThreadSnapshotById(id: string) {
  const querySnapshot = await getOfferThreadsCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
