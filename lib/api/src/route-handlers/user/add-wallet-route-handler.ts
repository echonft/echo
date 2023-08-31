import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { addWalletRequestHandler } from '../../request-handlers/user/add-wallet-request-handler'
import { AddWalletRequest, ApiRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function addWalletRouteHandler(req: ApiRequest<AddWalletRequest>, authOptions: AuthOptions) {
  return await handleRestrictedRequest(req, authOptions, addWalletRequestHandler)
}
