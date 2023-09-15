import { getSessionSnapshotByUserId } from '@echo/firestore/crud/session/get-session-snapshot-by-user-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteSession(userId: string): Promise<WriteResult> {
  const documentSnapshot = await getSessionSnapshotByUserId(userId)
  if (isNil(documentSnapshot)) {
    throw Error(`session with userId ${userId} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
