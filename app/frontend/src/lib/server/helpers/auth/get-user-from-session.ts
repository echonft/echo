import { getSession } from '@server/helpers/auth/get-session'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { getUserById } from '@server/helpers/user/get-user-by-id'
import type { AuthOptions } from 'next-auth'
import { isNil } from 'ramda'

export async function getUserFromSession(authOptions: AuthOptions) {
  const session = await getSession(authOptions)
  if (isNil(session)) {
    throw new ForbiddenError('session is nil')
  }
  const user = await getUserById(session.user.id)
  if (isNil(user)) {
    throw new ForbiddenError('user from session is nil')
  }
  return user
}
