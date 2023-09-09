import { ServerError } from '../error/server-error'
import { setUserNonce as FirestoreSetUserNonce } from '@echo/firestore'
import { User } from '@echo/firestore-types'
import { generateNonce } from 'siwe'

export const setUserNonce = async (user: User) => {
  try {
    const nonce = generateNonce()
    await FirestoreSetUserNonce(user.id, nonce)
    return nonce
  } catch (e) {
    throw new ServerError(`error setting nonce for user ${JSON.stringify(user)}`, e)
  }
}
