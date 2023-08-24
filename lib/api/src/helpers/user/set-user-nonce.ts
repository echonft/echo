import { ApiError } from '../api-error'
import { setUserNonce as FirestoreSetUserNonce, User } from '@echo/firestore'

export const setUserNonce = async (user: User) => {
  try {
    return await FirestoreSetUserNonce(user.id)
  } catch (e) {
    throw new ApiError(500, 'Error setting user nonce')
  }
}
