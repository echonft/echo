import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import { generateNonce } from 'siwe'

export async function setUserNonce(userId: string) {
  try {
    const nonce = generateNonce()
    await setNonceForUser(userId, nonce)
    return nonce
  } catch (e) {
    throw new ServerError(`error setting nonce for user with id  ${userId}`, e)
  }
}
