import { ApiError } from '../helpers/error/api-error'
import { RequestHandler } from '../types/request-handlers/request-handler'
import { ApiRequest, ApiResponse } from '@echo/api-public'
import { initialize, terminate } from '@echo/firestore'
import { errorMessage } from '@echo/utils'

export async function handleRequest<T, Q extends Record<string, string | string[]>, U>(
  req: ApiRequest<T, Q>,
  res: ApiResponse<U>,
  requestHandler: RequestHandler<T, Q, U>
) {
  try {
    initialize()
    await requestHandler(req, res)
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
