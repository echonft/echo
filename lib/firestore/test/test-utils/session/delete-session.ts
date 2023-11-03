import { getSessionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-sessions-collection-reference'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { WriteResult } from 'firebase-admin/firestore'

export async function deleteSession(userId: string): Promise<WriteResult> {
  const querySnapshot = await getSessionsCollectionReference().where('userId', '==', userId).get()
  const documentSnapshot = getQuerySnapshotDocumentSnapshot(querySnapshot)
  assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot.ref.delete()
}
