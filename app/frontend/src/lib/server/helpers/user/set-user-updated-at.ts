import { ServerError } from '../error/server-error'
import { setUserUpdatedAt as FirestoreSetUserUpdatedAt, User } from '@echo/firestore'

export const setUserUpdatedAt = async (user: User) => {
  try {
    return await FirestoreSetUserUpdatedAt(user.id)
  } catch (e) {
    throw new ServerError('Error setting user updatedAt')
  }
}
