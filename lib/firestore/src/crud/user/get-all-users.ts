import { getUsersCollection } from '@echo/firestore/helpers/collection/get-users-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllUsers() {
  const querySnapshot = await getUsersCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
