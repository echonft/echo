import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'

export async function getAllSwaps() {
  const querySnapshot = await getSwapsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
