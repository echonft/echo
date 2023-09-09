import { ServerError } from '../error/server-error'
import { findUserByUsername } from '@echo/firestore/src/crud/user/find-user-by-username'

export async function getUserByUsername(username: string) {
  try {
    return await findUserByUsername(username)
  } catch (e) {
    throw new ServerError()
  }
}
