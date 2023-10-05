import { getSwapsCollection } from '@echo/firestore/helpers/collection/get-swaps-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllSwaps() {
  const querySnapshot = await getSwapsCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
