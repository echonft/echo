import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { WalletRequest } from '../../types/models/requests/wallet-request'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { createWalletHandler } from './create-wallet-handler'
import { deleteWalletHandler } from './delete-wallet-handler'
import { isNil } from 'ramda'

export const walletHandler: RequestHandler<ApiRequest<WalletRequest, never>, WalletResponse> = async (
  req,
  res,
  session
) => {
  // TODO Shouldn't have to do that
  if (isNil(session)) {
    res.status(401).json({ error: 'You must be logged in' })
    return Promise.resolve()
  }
  const { user } = session
  if (isNil(user)) {
    res.status(500).json({ error: 'User not found' })
    return
  }
  const { wallet, message, signature } = req.body

  switch (req.method) {
    case 'PUT':
      return createWalletHandler(user, wallet, message, signature, res)
    case 'DELETE':
      return deleteWalletHandler(user, wallet, res)
    default:
      res.status(500).json({ error: 'Unhandled error' })
  }
}
