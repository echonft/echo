import { findSessionByUserId } from '@echo/firestore/crud/session/find-session-by-user-id'
import { isNil } from 'ramda'

export async function getSessionToken(userId: string) {
  const session = await findSessionByUserId(userId)
  if (isNil(session)) {
    throw Error(`session for user with id ${userId} does not exist`)
  }
  return session.sessionToken
}
