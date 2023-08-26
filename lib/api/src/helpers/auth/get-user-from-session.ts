import { ApiError } from '../error/api-error'
import { User } from '@echo/firestore'
import { Session } from 'next-auth'
import { isNil } from 'ramda'

export function getUserFromSession(session: Session | undefined): User {
  if (isNil(session) || isNil(session.user)) {
    throw new ApiError(401, 'Unauthorized')
  }
  return session.user
}
