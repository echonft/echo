import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'

export async function getCollectionSwapsCountSnapshotByCollectionId(collectionId: string) {
  const querySnapshot = await getCollectionSwapsCountCollectionReference()
    .where('collectionId', '==', collectionId)
    .get()
  return getQuerySnapshotUniqueDocumentSnapshot(querySnapshot)
}
