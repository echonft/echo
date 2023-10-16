import { getSessionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-sessions-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findSessionByToken(token: string) {
  const querySnapshot = await getSessionsCollectionReference().where('sessionToken', '==', token).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
