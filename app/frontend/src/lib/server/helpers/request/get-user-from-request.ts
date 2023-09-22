import { ApiRequest } from '@echo/api/types/base/api-request'
import { userDataConverter } from '@echo/firestore/converters/user/user-data-converter'
import { findSessionByToken } from '@echo/firestore/crud/session/find-session-by-token'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { UnauthorizedError } from '@server/helpers/error/unauthorized-error'
import { getBearerTokenFromRequest } from '@server/helpers/request/get-bearer-token-from-request'
import { getUserById } from '@server/helpers/user/get-user-by-id'
import { isNil } from 'ramda'

export async function getUserFromRequest<T>(req: ApiRequest<T>) {
  const sessionToken = getBearerTokenFromRequest(req)
  if (isNilOrEmpty(sessionToken)) {
    throw new UnauthorizedError('session token is not in the request')
  }
  const session = await findSessionByToken(sessionToken)
  if (isNil(session)) {
    throw new UnauthorizedError(`there is no session associated with session token ${sessionToken}`)
  }
  const user = await getUserById(session.userId)
  if (isNil(user)) {
    throw new ForbiddenError(`there is no user associated with session token ${sessionToken}`)
  }
  return userDataConverter.toFirestore(user) as AuthUser
}
