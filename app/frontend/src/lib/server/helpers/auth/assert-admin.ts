import { UnauthorizedError } from '../error/unauthorized-error'
import { getAdminApiKey } from './get-admin-api-key'
import { ApiRequest } from '@echo/api'

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
