import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'

export async function getAllOfferThreadCloseRequests() {
  const querySnapshot = await getOfferThreadsCloseRequestsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
