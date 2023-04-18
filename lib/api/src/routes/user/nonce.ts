import { nonceHandler } from '../../handlers/user/nonce-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { ErrorResponse } from '../../types/models/responses/error-response'
import { NonceResponse } from '../../types/models/responses/nonce-response'
import { withMethodValidation } from '../../utils/with-method-validation'
import { withSession } from '../../utils/with-session'
import { NextApiResponse } from 'next'

export const nonce = async (req: ApiRequest<null, never>, res: NextApiResponse<ErrorResponse | NonceResponse>) => {
  try {
    await withMethodValidation(withSession(nonceHandler), ['GET'])(req, res)
  } catch (error) {
    return
  }
}
