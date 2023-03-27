import { NonceResponse } from '../types'
import { RequestHandler } from '../types/handlers/request-handler'
import { NonceApiRequest } from '../types/models/api-requests/nonce-api-request'
import { withMethodValidation } from '../utils/with-method-validation'

const handler: RequestHandler<NonceApiRequest, NonceResponse> = async (_req, res) => {
  // TODO Manage the nonce when adding wallet. Not used for now
  res.send({ nonce: crypto.randomUUID() })
  return Promise.resolve()
}

// Pipe
export const nonce = withMethodValidation(handler, ['GET'])
