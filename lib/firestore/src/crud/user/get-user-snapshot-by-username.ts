import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshot'

export async function getUserSnapshotByUsername(username: string) {
  const querySnapshot = await getUsersCollectionReference().where('username', '==', username).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
