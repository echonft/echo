import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { removeWalletRequestHandler } from '../../request-handlers/user/remove-wallet-request-handler'
import { ApiRequest, RemoveWalletRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function removeWalletRouteHandler(req: ApiRequest<RemoveWalletRequest>, authOptions: AuthOptions) {
  return await handleRestrictedRequest(req, authOptions, removeWalletRequestHandler)
}
