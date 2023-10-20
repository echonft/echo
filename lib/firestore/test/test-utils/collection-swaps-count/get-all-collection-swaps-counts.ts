import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllCollectionSwapsCounts() {
  const querySnapshot = await getCollectionSwapsCountCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
