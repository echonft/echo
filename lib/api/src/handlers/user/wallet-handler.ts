import { ApiError } from '../../helpers/api-error'
import { getUserFromSession } from '../../helpers/handler/get-user-from-session'
import { parseAddWalletRequest } from '../../helpers/wallet/parse-add-wallet-request'
import { parseRemoveWalletRequest } from '../../helpers/wallet/parse-remove-wallet-request'
import { RequestHandler } from '../../types/handlers/request-handler'
import { handleCreateWallet } from './handle-create-wallet'
import { handleDeleteWallet } from './handle-delete-wallet'
import { ApiRequest, WalletRequest, WalletResponse } from '@echo/api-public'
import { SiweMessage } from 'siwe'

export const walletHandler: RequestHandler<ApiRequest<WalletRequest, never>, WalletResponse> = async (
  req,
  res,
  session
) => {
  try {
    const user = getUserFromSession(session)
    switch (req.method) {
      case 'PUT':
        // We need to create the SiweMessage here because that's the only way to validate its type
        // Validation could be improved and check some values instead of types
        const validatedAddWalletRequest = parseAddWalletRequest({
          ...req.body,
          message: new SiweMessage(req.body.message ?? '')
        })
        return handleCreateWallet(
          user,
          validatedAddWalletRequest.wallet,
          validatedAddWalletRequest.message,
          validatedAddWalletRequest.signature,
          res
        )
      case 'DELETE':
        const validatedRemoveWalletRequest = parseRemoveWalletRequest(req.body)
        return handleDeleteWallet(user, validatedRemoveWalletRequest.wallet, res)
      default:
        res.end(res.status(500).json({ error: 'Unhandled error' }))
        return
    }
  } catch (e) {
    const { status, message } = e as ApiError
    res.end(res.status(status).json({ error: message }))
    return
  }
}
