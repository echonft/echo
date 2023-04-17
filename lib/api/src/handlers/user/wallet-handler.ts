import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { WalletRequest } from '../../types/models/requests/wallet-request'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { addWalletSchema } from '../../types/models/validators/add-wallet'
import { removeWalletsSchema } from '../../types/models/validators/remove-wallets'
import { createWalletHandler } from './create-wallet-handler'
import { deleteWalletHandler } from './delete-wallet-handler'
import { isNil } from 'ramda'
import { SiweMessage } from 'siwe'

export const walletHandler: RequestHandler<ApiRequest<WalletRequest, never>, WalletResponse> = async (
  req,
  res,
  session
) => {
  // TODO Shouldn't have to do that
  if (isNil(session)) {
    res.end(res.status(401).json({ error: 'You must be logged in' }))
    return
  }
  const { user } = session
  if (isNil(user)) {
    res.end(res.status(500).json({ error: 'User not found' }))
    return
  }
  let validatedRequest
  try {
    switch (req.method) {
      case 'PUT':
        // We need to create the SiweMessage here because that's the only way to validate its type
        // Validation could be improved and check some values instead of types
        validatedRequest = addWalletSchema.parse({ ...req.body, message: new SiweMessage(req.body.message!) })
        return createWalletHandler(
          user,
          validatedRequest.wallet,
          validatedRequest.message,
          validatedRequest.signature,
          res
        )
      case 'DELETE':
        validatedRequest = removeWalletsSchema.parse(req.body)
        return deleteWalletHandler(user, validatedRequest.wallet, res)
      default:
        res.status(500).json({ error: 'Unhandled error' })
    }
  } catch (e) {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
  res.status(500).json({ error: 'Unhandled error' })
  return Promise.resolve()
}
