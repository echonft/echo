import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { ServerError } from '@server/helpers/error/server-error'
import { generateNonce } from 'siwe'

export const setUserNonce = async (userId: string) => {
  try {
    const nonce = generateNonce()
    await setNonceForUser(userId, nonce)
    return nonce
  } catch (e) {
    throw new ServerError(`error setting nonce for user with id  ${userId}`, e)
  }
}
