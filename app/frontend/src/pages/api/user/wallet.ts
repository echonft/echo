import { authOptions } from '../auth/[...nextauth]'
import { walletHandler, withMethodValidation, withSession } from '@echo/api'
import { ApiRequest, EmptyResponse, ErrorResponse, WalletRequest } from '@echo/api-public'
import { NextApiResponse } from 'next'

const wallet = async (req: ApiRequest<WalletRequest, never>, res: NextApiResponse<ErrorResponse | EmptyResponse>) => {
  try {
    await withMethodValidation(withSession(walletHandler, authOptions), ['PUT', 'DELETE'])(req, res)
  } catch (error) {
    return
  }
}

export default wallet
