import { ApiRequest } from '@echo/api/types/api-request'
import { findSessionByToken } from '@echo/firestore/crud/session/find-session-by-token'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getBearerTokenFromRequest } from '@echo/frontend/lib/server/helpers/request/get-bearer-token-from-request'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { captureException } from '@sentry/nextjs'
import { isNil } from 'ramda'

export async function getUserFromRequest(req: ApiRequest<unknown>) {
  const sessionToken = getBearerTokenFromRequest(req)
  if (isNilOrEmpty(sessionToken)) {
    return undefined
  }
  try {
    const session = await findSessionByToken(sessionToken)
    if (isNil(session)) {
      return undefined
    }
    const user = await findUserById(session.userId)
    if (isNil(user)) {
      return undefined
    }
    return user
  } catch (e) {
    captureException(e)
    return undefined
  }
}
