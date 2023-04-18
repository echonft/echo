import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { NonceResponse } from '../../types/model/responses/nonce-response'
import { setNonceForUser } from '@echo/firebase-admin'
import { isNil } from 'ramda'

export const nonceHandler: RequestHandler<ApiRequest<null, never>, NonceResponse> = async (_req, res, session) => {
  // TODO Shouldn't have to do that
  if (isNil(session)) {
    res.status(401).json({ error: 'You must be logged in' })
    return Promise.resolve()
  }
  const nonce = await setNonceForUser(session.user.id)
  return res.status(200).json({ nonce })
}
