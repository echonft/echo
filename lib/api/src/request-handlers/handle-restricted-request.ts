import { ApiError } from '../helpers/error/api-error'
import { RestrictedRequestHandler } from '../types/request-handlers/restricted-request-handler'
import { ApiRequest, ApiResponse, ErrorResponse } from '@echo/api-public'
import { initialize, terminate } from '@echo/firestore'
import { errorMessage } from '@echo/utils'
import { AuthOptions } from 'next-auth'

export async function handleRestrictedRequest<T, Q extends Record<string, string | string[]>, U>(
  req: ApiRequest<T, Q>,
  res: ApiResponse<U | ErrorResponse>,
  authOptions: AuthOptions,
  requestHandler: RestrictedRequestHandler<T, Q, U>
) {
  try {
    initialize()
    await requestHandler(req, res, authOptions)
  } catch (error) {
    if (error instanceof ApiError) {
      error.endResponse(res)
    } else {
      res.end(res.status(500).json({ error: errorMessage(error) }))
    }
  } finally {
    await terminate()
  }
}
