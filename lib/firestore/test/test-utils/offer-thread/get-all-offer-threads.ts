import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'

export async function getAllOfferThreads() {
  const querySnapshot = await getOfferThreadsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
