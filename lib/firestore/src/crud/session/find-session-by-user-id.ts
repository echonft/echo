import { getSessionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-sessions-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'
import type { Session } from '@echo/firestore/types/model/session/session'

export async function findSessionByUserId(userId: string): Promise<Session | undefined> {
  const querySnapshot = await getSessionsCollectionReference().where('userId', '==', userId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
