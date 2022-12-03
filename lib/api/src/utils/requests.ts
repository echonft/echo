import { ApiRequestWithUserId } from '../types/models/api-requests/api-request-with-user-id'
import { DocumentSnapshot, FirebaseUser } from '@echo/firebase'
import { userSnapshot } from '@echo/firebase-admin'

export async function getUserWithId(req: ApiRequestWithUserId): Promise<DocumentSnapshot<FirebaseUser>> {
  const { userId } = req.body
  const user = await userSnapshot(userId)
  return user
}
