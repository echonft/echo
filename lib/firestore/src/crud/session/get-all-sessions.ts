import { getSessionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-sessions-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllSessions() {
  const querySnapshot = await getSessionsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
