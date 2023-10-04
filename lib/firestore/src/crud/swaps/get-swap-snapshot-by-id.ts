import { getSwapsCollection } from '@echo/firestore/helpers/collection/get-swaps-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getSwapSnapshotById(id: string) {
  const querySnapshot = await getSwapsCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
