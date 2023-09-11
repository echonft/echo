import type { ApiRequest } from '@echo/api/types'
import { getAdminApiKey } from '@server/helpers/auth/get-admin-api-key'
import { UnauthorizedError } from '@server/helpers/error/unauthorized-error'

export const assertAdmin = <T>(req: ApiRequest<T>) => {
  const authorizationHeader = 'Authorization'
  if (!req.headers.has(authorizationHeader) || req.headers.get(authorizationHeader) !== `Bearer ${getAdminApiKey()}`) {
    throw new UnauthorizedError(
      `request for ${req.url} does not contain a valid authorization header. Authorization header is ${req.headers.get(
        authorizationHeader
      )}`
    )
  }
}
