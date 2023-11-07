import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'

export async function findOfferThread(offerId: string) {
  const querySnapshot = await getOfferThreadsCollectionReference().where('offerId', '==', offerId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
