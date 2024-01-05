import { getSessionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-sessions-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'
import type { Session } from '@echo/firestore/types/model/session/session'

export async function findSessionByToken(token: string): Promise<Session | undefined> {
  const querySnapshot = await getSessionsCollectionReference().where('sessionToken', '==', token).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
