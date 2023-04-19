import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { FirebaseTokenResponse } from '../../types/model/responses/firebase-token-response'
import { createCustomToken } from '../../utils/auth/create-custom-token'
import { isNil } from 'ramda'

export const getFirebaseTokenHandler: RequestHandler<ApiRequest<null, never>, FirebaseTokenResponse> = async (
  _req,
  res,
  session
) => {
  // TODO Shouldn't have to do that
  if (isNil(session)) {
    res.end(res.status(401).json({ error: 'You must be logged in' }))
    return
  }
  return createCustomToken(session.user.id)
    .then((firebaseToken) => res.status(200).json({ firebaseToken }))
    .catch(() => {
      res.end(res.status(500).json({ error: 'Unhandled error' }))
      return
    })
}
