import { ApiError } from '../error/api-error'
import { setUserUpdatedAt as FirestoreSetUserUpdatedAt, User } from '@echo/firestore'

export const setUserUpdatedAt = async (user: User) => {
  try {
    return await FirestoreSetUserUpdatedAt(user.id)
  } catch (e) {
    throw new ApiError(500, 'Error setting user updatedAt')
  }
}
