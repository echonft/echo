import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getCollectionSwapsCountSnapshotByCollectionId(collectionId: string) {
  const querySnapshot = await getCollectionSwapsCountCollectionReference()
    .where('collectionId', '==', collectionId)
    .get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
