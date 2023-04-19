import { authOptions } from '../auth/[...nextauth]'
import {
  ApiRequest,
  ErrorResponse,
  walletHandler,
  WalletRequest,
  WalletResponse,
  withMethodValidation,
  withSession
} from '@echo/api'
import { NextApiResponse } from 'next'

const wallet = async (req: ApiRequest<WalletRequest, never>, res: NextApiResponse<ErrorResponse | WalletResponse>) => {
  try {
    await withMethodValidation(withSession(walletHandler, authOptions), ['PUT', 'DELETE'])(req, res)
  } catch (error) {
    return
  }
}

export default wallet
