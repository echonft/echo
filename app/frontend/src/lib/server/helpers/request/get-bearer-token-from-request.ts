import { ApiRequest } from '@echo/api/types/api-request'
import { UnauthorizedError } from '@echo/frontend/lib/server/helpers/error/unauthorized-error'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getBearerTokenFromRequest<T>(req: ApiRequest<T>) {
  const authorizationHeaderName = 'Authorization'
  if (!req.headers.has(authorizationHeaderName)) {
    throw new UnauthorizedError(`request for ${req.url} does not contain an authorization header`)
  }
  const authorizationHeader = req.headers.get(authorizationHeaderName)
  if (isNilOrEmpty(authorizationHeader)) {
    throw new UnauthorizedError(`request for ${req.url} does not contain an authorization header`)
  }
  if (!authorizationHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError(`request for ${req.url} authorization header is not a Bearer token`)
  }
  return authorizationHeader.split(' ')[1]
}
