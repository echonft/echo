import { findUserByUsername } from '@echo/firestore'
import { ServerError } from '@server/helpers/error/server-error'

export async function getUserByUsername(username: string) {
  try {
    return await findUserByUsername(username)
  } catch (e) {
    throw new ServerError(`error getting user with username ${username}`, e)
  }
}
