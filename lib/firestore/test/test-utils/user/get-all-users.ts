import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllUsers() {
  const querySnapshot = await getUsersCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
