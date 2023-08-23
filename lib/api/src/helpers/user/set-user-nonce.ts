import { ApiError } from '../error/api-error'
import { setUserNonce as FirestoreSetUserNonce, User } from '@echo/firestore'
import { generateNonce } from 'siwe'

export const setUserNonce = async (user: User) => {
  try {
    const nonce = generateNonce()
    await FirestoreSetUserNonce(user.id, nonce)
    return nonce
  } catch (e) {
    throw new ApiError(500, 'Error setting user nonce')
  }
}
