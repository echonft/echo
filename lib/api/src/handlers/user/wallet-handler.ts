import { endResponseOnApiError } from '../../helpers/error/end-response-on-api-error'
import { parseAddWalletRequest } from '../../helpers/user/parse-add-wallet-request'
import { parseRemoveWalletRequest } from '../../helpers/user/parse-remove-wallet-request'
import { RequestHandler } from '../../types/handlers/request-handler'
import { handleCreateWallet } from './handle-create-wallet'
import { handleDeleteWallet } from './handle-delete-wallet'
import { ApiRequest, EmptyResponse, WalletRequest } from '@echo/api-public'
import { SiweMessage } from 'siwe'

export const walletHandler: RequestHandler<ApiRequest<WalletRequest, never>, EmptyResponse> = async (
  req,
  res,
  session
) => {
  try {
    switch (req.method) {
      case 'PUT':
        // We need to create the SiweMessage here because that's the only way to validate its type
        // Validation could be improved and check some values instead of types
        const validatedAddWalletRequest = parseAddWalletRequest({
          ...req.body,
          message: new SiweMessage(req.body.message ?? '')
        })
        return handleCreateWallet(
          session,
          validatedAddWalletRequest.wallet,
          validatedAddWalletRequest.message,
          validatedAddWalletRequest.signature,
          res
        )
      case 'DELETE':
        const validatedRemoveWalletRequest = parseRemoveWalletRequest(req.body)
        return handleDeleteWallet(session, validatedRemoveWalletRequest.wallet, res)
      default:
        res.end(res.status(500).json({ error: 'Unhandled error' }))
        return
    }
  } catch (e) {
    return endResponseOnApiError(e, res)
  }
}
