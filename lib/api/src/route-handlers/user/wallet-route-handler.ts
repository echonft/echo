import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { walletRequestHandler } from '../../request-handlers/user/wallet-request-handler'
import { AddWalletRequest, ApiRequest, ApiResponse, EmptyResponse, RemoveWalletRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export function walletRouteHandler(
  req: ApiRequest<AddWalletRequest | RemoveWalletRequest>,
  res: ApiResponse<EmptyResponse>,
  authOptions: AuthOptions
) {
  return handleRestrictedRequest(req, res, authOptions, walletRequestHandler)
}
