import { ApiError } from '../api-error'
import { User } from '@echo/firestore'
import { Session } from 'next-auth'
import { isNil } from 'ramda'

export function getUserFromSession(session: Session | undefined): User {
  if (isNil(session) || isNil(session?.user)) {
    throw new ApiError(401, 'Forbidden')
  }
  return session.user
}
