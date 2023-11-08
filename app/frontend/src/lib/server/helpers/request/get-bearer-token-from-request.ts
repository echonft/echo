import { ApiRequest } from '@echo/api/types/api-request'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getBearerTokenFromRequest(req: ApiRequest<unknown>) {
  const authorizationHeaderName = 'Authorization'
  if (!req.headers.has(authorizationHeaderName)) {
    return undefined
  }
  const authorizationHeader = req.headers.get(authorizationHeaderName)
  if (isNilOrEmpty(authorizationHeader)) {
    return undefined
  }
  if (!authorizationHeader.startsWith('Bearer ')) {
    return undefined
  }
  return authorizationHeader.split(' ')[1]
}
