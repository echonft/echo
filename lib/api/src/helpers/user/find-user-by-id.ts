import { ApiError } from '../error/api-error'
import { findUserById as firestoreFindUserById } from '@echo/firestore'

export const findUserById = async (userId: string) => {
  try {
    return await firestoreFindUserById(userId)
  } catch (e) {
    throw new ApiError(500, 'Error fetching user')
  }
}
