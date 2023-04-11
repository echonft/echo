import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { WalletRequest } from '../../types/models/requests/wallet-request'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { getUserWithDiscordId } from '../../utils/user'
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
  const user = await getUserWithDiscordId(session.user.discordId)
  if (isNil(user)) {
    res.status(500).json({ error: `User ${session.user.discordId} not found` })
    return
  }
  switch (req.method) {
    case 'PUT':
      return createWalletHandler(user, req.body, res)
    case 'DELETE':
      return deleteWalletHandler(user, req.body, res)
  }
}
