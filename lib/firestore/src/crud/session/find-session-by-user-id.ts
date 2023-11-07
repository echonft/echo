import { getSessionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-sessions-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'

export async function findSessionByUserId(userId: string) {
  const querySnapshot = await getSessionsCollectionReference().where('userId', '==', userId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
