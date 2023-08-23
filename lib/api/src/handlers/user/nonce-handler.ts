import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { endResponseOnApiError } from '../../helpers/error/end-response-on-api-error'
import { setUserNonce } from '../../helpers/user/set-user-nonce'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest, NonceResponse } from '@echo/api-public'

export const nonceHandler: RequestHandler<ApiRequest<null, never>, NonceResponse> = async (_req, res, session) => {
  try {
    const user = getUserFromSession(session)
    const nonce = await setUserNonce(user)
    return res.status(200).json({ nonce })
  } catch (e) {
    return endResponseOnApiError(e, res)
  }
}
