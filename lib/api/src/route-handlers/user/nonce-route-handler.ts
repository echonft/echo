import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { nonceRequestHandler } from '../../request-handlers/user/nonce-request-handler'
import { ApiRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function nonceRouteHandler(req: ApiRequest<never>, authOptions: AuthOptions) {
  return await handleRestrictedRequest(req, authOptions, nonceRequestHandler)
}
