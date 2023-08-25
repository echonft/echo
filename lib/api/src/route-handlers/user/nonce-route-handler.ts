import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { nonceRequestHandler } from '../../request-handlers/user/nonce-request-handler'
import { ApiRequest, ApiResponse, NonceResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export function nonceRouteHandler(req: ApiRequest<never>, res: ApiResponse<NonceResponse>, authOptions: AuthOptions) {
  return handleRestrictedRequest(req, res, authOptions, nonceRequestHandler)
}
