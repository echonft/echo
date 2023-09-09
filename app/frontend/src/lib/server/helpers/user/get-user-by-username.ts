import { ServerError } from '../error/server-error'
import { findUserByUsername } from '@echo/firestore'

export async function getUserByUsername(username: string) {
  try {
    return await findUserByUsername(username)
  } catch (e) {
    throw new ServerError(`error getting user with username ${username}`, e)
  }
}
