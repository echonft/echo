import { CollectionName } from '@echo/firestore/constants/collection-name'
import { sessionDataConverter } from '@echo/firestore/converters/session/session-data-converter'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findSessionByUserId(userId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SESSIONS)
    .where('userId', '==', userId)
    .withConverter(sessionDataConverter)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
