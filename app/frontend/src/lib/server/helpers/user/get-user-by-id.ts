import { findUserById } from '@echo/firestore'
import { ServerError } from '@server/helpers/error/server-error'

export const getUserById = async (userId: string) => {
  try {
    return await findUserById(userId)
  } catch (e) {
    throw new ServerError(`error getting user with id ${userId}`, e)
  }
}
