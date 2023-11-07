import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import { now } from '@echo/utils/helpers/now'

export async function getAllReadyOfferThreadCloseRequests() {
  const querySnapshot = await getOfferThreadsCloseRequestsCollectionReference().where('closeAt', '<', now()).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
