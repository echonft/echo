import { ForbiddenError } from '../error/forbidden-error'
import { findUserById } from '../user/find-user-by-id'
import { getSession } from './get-session'
import { ApiResponse } from '@echo/api-public'
import { NextApiRequest } from 'next'
import { AuthOptions } from 'next-auth'
import { isNil } from 'ramda'

export async function getUserFromSession<T extends NextApiRequest, U>(
  req: T,
  res: ApiResponse<U>,
  authOptions: AuthOptions
) {
  const session = await getSession(req, res, authOptions)
  if (isNil(session)) {
    throw new ForbiddenError()
  }
  const user = await findUserById(session.user.id)
  if (isNil(user)) {
    throw new ForbiddenError()
  }
  return user
}
