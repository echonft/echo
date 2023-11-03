import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function guarded_findUserById(userId: string) {
  try {
    return await findUserById(userId)
  } catch (e) {
    throw new ServerError(`error getting user with id ${userId}`, e)
  }
}
