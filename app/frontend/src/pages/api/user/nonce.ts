import { authOptions } from '../auth/[...nextauth]'
import { ApiRequest, ErrorResponse, nonceHandler, NonceResponse, withMethodValidation, withSession } from '@echo/api'
import { NextApiResponse } from 'next'

const nonce = async (req: ApiRequest<null, never>, res: NextApiResponse<ErrorResponse | NonceResponse>) => {
  try {
    await withMethodValidation(withSession(nonceHandler, authOptions), ['GET'])(req, res)
  } catch (error) {
    return
  }
}
export default nonce
