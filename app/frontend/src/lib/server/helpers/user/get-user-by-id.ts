import { ServerError } from '../error/server-error'
import { findUserById } from '@echo/firestore'

export const getUserById = async (userId: string) => {
  try {
    return await findUserById(userId)
  } catch (e) {
    throw new ServerError(`error getting user with id ${userId}`, e)
  }
}
