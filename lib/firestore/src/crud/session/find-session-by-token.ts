import { getSessionsCollection } from '@echo/firestore/helpers/collection/get-sessions-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findSessionByToken(token: string) {
  const querySnapshot = await getSessionsCollection().where('sessionToken', '==', token).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
