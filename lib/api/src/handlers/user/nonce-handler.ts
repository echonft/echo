import { ApiError } from '../../helpers/api-error'
import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { setUserNonce } from '../../helpers/user/set-user-nonce'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest, NonceResponse } from '@echo/api-public'

export const nonceHandler: RequestHandler<ApiRequest<null, never>, NonceResponse> = async (_req, res, session) => {
  try {
    const user = getUserFromSession(session)
    const nonce = await setUserNonce(user)
    return res.status(200).json({ nonce })
  } catch (e) {
    const { status, message } = e as ApiError
    res.end(res.status(status).json({ error: message }))
    return
  }
}
