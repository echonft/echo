import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export function guarded_findNonceForUser(userId: string) {
  try {
    return findNonceForUser(userId)
  } catch (e) {
    throw new ServerError(`error getting nonce for user with id ${userId}`, e)
  }
}
