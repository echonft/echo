import { getFirebaseTokenHandler } from '../../handlers/auth/get-firebase-token-handler'
import { ErrorResponse } from '../../types/models/responses/error-response'
import { FirebaseTokenResponse } from '../../types/models/responses/firebase-token-response'
import { withMethodValidation } from '../../utils/with-method-validation'
import { withSession } from '../../utils/with-session'
import { NextApiResponse } from 'next'
import { ApiRequest } from 'types/models/api-requests/api-request'

export const getFirebaseToken = async (
  req: ApiRequest<null, never>,
  res: NextApiResponse<ErrorResponse | FirebaseTokenResponse>
) => {
  try {
    await withMethodValidation(withSession(getFirebaseTokenHandler), ['GET'])(req, res)
  } catch (error) {
    return
  }
}
