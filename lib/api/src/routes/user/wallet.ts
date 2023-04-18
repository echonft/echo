import { walletHandler } from '../../handlers/user/wallet-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { WalletRequest } from '../../types/models/requests/wallet-request'
import { ErrorResponse } from '../../types/models/responses/error-response'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { withMethodValidation } from '../../utils/with-method-validation'
import { withSession } from '../../utils/with-session'
import { NextApiResponse } from 'next'

export const wallet = async (
  req: ApiRequest<WalletRequest, never>,
  res: NextApiResponse<ErrorResponse | WalletResponse>
) => {
  try {
    await withMethodValidation(withSession(walletHandler), ['PUT', 'DELETE'])(req, res)
  } catch (error) {
    return
  }
}
