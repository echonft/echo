import { ApiRequest } from '@echo/api/types/api-request'
import { findSessionByToken } from '@echo/firestore/crud/session/find-session-by-token'
import { ForbiddenError } from '@echo/frontend/lib/server/helpers/error/forbidden-error'
import { UnauthorizedError } from '@echo/frontend/lib/server/helpers/error/unauthorized-error'
import { getBearerTokenFromRequest } from '@echo/frontend/lib/server/helpers/request/get-bearer-token-from-request'
import { guarded_findUserById } from '@echo/frontend/lib/server/helpers/user/guarded_find-user-by-id'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNil } from 'ramda'

export async function guarded_getUserFromRequest<T>(req: ApiRequest<T>) {
  const sessionToken = getBearerTokenFromRequest(req)
  if (isNilOrEmpty(sessionToken)) {
    throw new UnauthorizedError('session token is not in the request')
  }
  const session = await findSessionByToken(sessionToken)
  if (isNil(session)) {
    throw new UnauthorizedError(`there is no session associated with session token ${sessionToken}`)
  }
  const user = await guarded_findUserById(session.userId)
  if (isNil(user)) {
    throw new ForbiddenError(`there is no user associated with session token ${sessionToken}`)
  }
  return user
}
