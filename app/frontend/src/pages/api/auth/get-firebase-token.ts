import { authOptions } from './[...nextauth]'
import {
  ApiRequest,
  ErrorResponse,
  FirebaseTokenResponse,
  getFirebaseTokenHandler,
  withMethodValidation,
  withSession
} from '@echo/api'
import { logger } from '@echo/utils'
import { NextApiResponse } from 'next'

const getFirebaseToken = (
  req: ApiRequest<null, never>,
  res: NextApiResponse<ErrorResponse | FirebaseTokenResponse>
) => {
  try {
    return withMethodValidation(withSession(getFirebaseTokenHandler, authOptions), ['GET'])(req, res).then(() =>
      Promise.resolve()
    )
  } catch (error) {
    logger.error(`getFirebaseToken error: ${(error as Error).message}`)
    res.end(res.status(500))
    return
  }
}
export default getFirebaseToken
