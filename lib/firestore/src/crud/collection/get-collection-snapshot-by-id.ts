import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getCollectionSnapshotById(id: string) {
  const querySnapshot = await getCollectionsCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
