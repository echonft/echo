import { nonceHandler } from '../handlers/nonce-handler'
import { ErrorResponse, NonceResponse } from '../types'
import { ApiRequest } from '../types/models/api-requests/api-request'
import { withMethodValidation } from '../utils/with-method-validation'
import { withSession } from '../utils/with-session'
import { NextApiResponse } from 'next'

export const nonce = async (req: ApiRequest<null, never>, res: NextApiResponse<ErrorResponse | NonceResponse>) => {
  try {
    await withMethodValidation(withSession(nonceHandler), ['GET'])(req, res)
  } catch (error) {
    return
  }
}
