import { authOptions } from '../auth/[...nextauth]'
import { walletHandler, withMethodValidation, withSession } from '@echo/api'
import { ApiRequest, ErrorResponse, WalletRequest, WalletResponse } from '@echo/api/dist/types'
import { NextApiResponse } from 'next'

const wallet = async (req: ApiRequest<WalletRequest, never>, res: NextApiResponse<ErrorResponse | WalletResponse>) => {
  try {
    await withMethodValidation(withSession(walletHandler, authOptions), ['PUT', 'DELETE'])(req, res)
  } catch (error) {
    return
  }
}

export default wallet
