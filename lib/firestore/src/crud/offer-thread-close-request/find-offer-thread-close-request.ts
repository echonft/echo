import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findOfferThreadCloseRequest(offerThreadId: string) {
  const querySnapshot = await getOfferThreadsCloseRequestsCollectionReference()
    .where('offerThreadId', '==', offerThreadId)
    .get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
