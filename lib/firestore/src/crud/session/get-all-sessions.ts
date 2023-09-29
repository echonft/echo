import { CollectionName } from '@echo/firestore/constants/collection-name'
import { sessionDataConverter } from '@echo/firestore/converters/session/session-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllSessions() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SESSIONS)
    .withConverter(sessionDataConverter)
    .get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
