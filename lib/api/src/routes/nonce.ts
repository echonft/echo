import { NonceResponse } from '../types'
import { RequestHandler } from '../types/handlers/request-handler'
import { NonceApiRequest } from '../types/models/api-requests/nonce-api-request'
import { withMethodValidation } from '../utils/with-method-validation'
import { withSession } from '../utils/with-session'
import { setNonceForUser } from '@echo/firebase-admin'

const handler: RequestHandler<NonceApiRequest, NonceResponse> = async (req, res) => {
  const nonce = await setNonceForUser(req.body.userId)
  res.send({ nonce })
  return Promise.resolve()
}

// Pipe
export const nonce = withMethodValidation(withSession(handler), ['POST'])
