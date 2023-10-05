import { getUsersCollection } from '@echo/firestore/helpers/collection/get-users-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getUserSnapshotByUsername(username: string) {
  const querySnapshot = await getUsersCollection().where('username', '==', username).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
