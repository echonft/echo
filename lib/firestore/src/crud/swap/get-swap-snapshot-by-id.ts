import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'

export async function getSwapSnapshotById(id: string) {
  const querySnapshot = await getSwapsCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotUniqueDocumentSnapshot(querySnapshot)
}
