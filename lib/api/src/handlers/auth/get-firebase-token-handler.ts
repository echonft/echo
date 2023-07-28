import { RequestHandler } from '../../types/handlers/request-handler'
import { createCustomToken } from '../../utils/auth/create-custom-token'
import { validateSession } from '../../utils/handler/validate-session'
import { ApiRequest, FirebaseTokenResponse } from '@echo/api-public'
import { isNil } from 'ramda'

export const getFirebaseTokenHandler: RequestHandler<ApiRequest<null, never>, FirebaseTokenResponse> = async (
  _req,
  res,
  session
) => {
  if (isNil(validateSession(session, res))) {
    return
  }
  return createCustomToken(session!.user.id)
    .then((firebaseToken) => res.status(200).json({ firebaseToken }))
    .catch(() => {
      res.end(res.status(500).json({ error: 'Unhandled error' }))
      return
    })
}
