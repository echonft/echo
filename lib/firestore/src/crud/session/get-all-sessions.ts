import { getSessionsCollection } from '@echo/firestore/helpers/collection/get-sessions-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllSessions() {
  const querySnapshot = await getSessionsCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
