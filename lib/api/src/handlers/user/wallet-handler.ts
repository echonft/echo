import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { WalletRequest } from '../../types/models/requests/wallet-request'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { createWalletHandler } from './create-wallet-handler'
import { deleteWalletHandler } from './delete-wallet-handler'

export const walletHandler: RequestHandler<ApiRequest<WalletRequest, never>, WalletResponse> = async (
  req,
  res,
  session
) => {
  const { method, body } = req
  if (method === 'PUT') {
    return createWalletHandler(session?.user, body.wallet, body.message, body.signature, res).then(() =>
      Promise.resolve()
    )
  } else if (method === 'DELETE') {
    return deleteWalletHandler(session?.user, body.wallet, res).then(() => Promise.resolve())
  }
  res.status(500).json({ error: 'Unhandled error' })
  return Promise.resolve()
}
