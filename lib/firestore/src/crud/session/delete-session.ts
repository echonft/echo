import { getSessionsCollection } from '@echo/firestore/helpers/collection/get-sessions-collection'
import { assertQuerySnapshot } from '@echo/firestore/helpers/crud/assert-query-snapshot'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function deleteSession(userId: string): Promise<WriteResult> {
  const querySnapshot = await getSessionsCollection().where('userId', '==', userId).get()
  assertQuerySnapshot(querySnapshot)
  const documentSnapshot = getQuerySnapshotDocumentSnapshot(querySnapshot)
  return documentSnapshot!.ref.delete()
}
