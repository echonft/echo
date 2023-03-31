import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { FirebaseTokenResponse } from '../../types/models/responses/firebase-token-response'

export const getFirebaseTokenHandler: RequestHandler<ApiRequest<null, never>, FirebaseTokenResponse> = (
  _req,
  res,
  session
) => {
  // TODO Add custom token creation
  res.status(200).json({ firebaseToken: 'caca' })
  return Promise.resolve()
}
