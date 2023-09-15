import { getSessionSnapshotByUserId } from '@echo/firestore/crud/session/get-session-snapshot-by-user-id'

export async function findSessionByUserId(userId: string) {
  const documentSnapshot = await getSessionSnapshotByUserId(userId)
  return documentSnapshot?.data()
}
