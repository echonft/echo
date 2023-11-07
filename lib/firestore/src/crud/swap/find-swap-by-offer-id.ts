import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'

export async function findSwapByOfferId(offerId: string) {
  const querySnapshot = await getSwapsCollectionReference().where('offerId', '==', offerId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
