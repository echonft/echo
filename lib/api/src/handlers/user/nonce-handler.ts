import { RequestHandler } from '../../types/handlers/request-handler'
import { validateSession } from '../../utils/handler/validate-session'
import { ApiRequest, NonceResponse } from '@echo/api-public'
import { setNonceForUser } from '@echo/firebase-admin'
import { isNil } from 'ramda'

export const nonceHandler: RequestHandler<ApiRequest<null, never>, NonceResponse> = async (_req, res, session) => {
  if (isNil(validateSession(session, res))) {
    return
  }
  const nonce = await setNonceForUser(session!.user.id)
  return res.status(200).json({ nonce })
}
