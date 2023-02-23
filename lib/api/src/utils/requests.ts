import { ApiRequestWithUserId } from '../types/models/api-requests/api-request-with-user-id'
import { findUserById } from '@echo/firebase-admin'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'

export async function getUserWithId(req: ApiRequestWithUserId): Promise<User | undefined> {
  const { userId } = req.body
  const result = await findUserById(userId)
  if (R.isOk(result)) {
    return R.getExn(result)
  }
  return Promise.resolve(undefined)
}
