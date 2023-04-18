import { getFirebaseTokenHandler } from '../../handlers/auth/get-firebase-token-handler'
import { ErrorResponse } from '../../types/models/responses/error-response'
import { FirebaseTokenResponse } from '../../types/models/responses/firebase-token-response'
import { withMethodValidation } from '../../utils/with-method-validation'
import { withSession } from '../../utils/with-session'
import { logger } from '@echo/utils'
import { NextApiResponse } from 'next'
import { ApiRequest } from 'types/models/api-requests/api-request'

export const getFirebaseToken = (
  req: ApiRequest<null, never>,
  res: NextApiResponse<ErrorResponse | FirebaseTokenResponse>
) => {
  try {
    return withMethodValidation(withSession(getFirebaseTokenHandler), ['GET'])(req, res).then(() => Promise.resolve())
  } catch (error) {
    logger.error(`getFirebaseToken error: ${(error as Error).message}`)
    res.end(res.status(500))
    return
  }
}
