import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function getUserByUsername(username: string) {
  try {
    return await findUserByUsername(username)
  } catch (e) {
    throw new ServerError(`error getting user with username ${username}`, e)
  }
}
