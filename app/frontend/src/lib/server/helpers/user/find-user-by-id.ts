import { ServerError } from '../error/server-error'
import { findUserById as firestoreFindUserById } from '@echo/firestore'

export const findUserById = async (userId: string) => {
  try {
    return await firestoreFindUserById(userId)
  } catch (e) {
    throw new ServerError('Error fetching user')
  }
}
