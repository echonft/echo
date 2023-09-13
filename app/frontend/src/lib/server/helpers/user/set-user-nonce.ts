import { setUserNonce as firestoreSetUserNonce } from '@echo/firestore/crud/user/set-user-nonce'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { ServerError } from '@server/helpers/error/server-error'
import { generateNonce } from 'siwe'

export const setUserNonce = async (user: FirestoreUser) => {
  try {
    const nonce = generateNonce()
    await firestoreSetUserNonce(user.id, nonce)
    return nonce
  } catch (e) {
    throw new ServerError(`error setting nonce for user ${JSON.stringify(user)}`, e)
  }
}
