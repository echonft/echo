import { auth } from '@echo/frontend/lib/helpers/auth/auth'
import { UnauthorizedError } from '@echo/frontend/lib/server/helpers/error/unauthorized-error'
import { isNil } from 'ramda'

export async function getApiUser() {
  const session = await auth()
  if (isNil(session) || isNil(session.user)) {
    throw new UnauthorizedError()
  }
  return session.user
}
