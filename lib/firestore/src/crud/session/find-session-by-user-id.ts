import { getSessionsCollection } from '@echo/firestore/helpers/collection/get-sessions-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findSessionByUserId(userId: string) {
  const querySnapshot = await getSessionsCollection().where('userId', '==', userId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
