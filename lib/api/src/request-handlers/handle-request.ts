import { ApiError } from '../helpers/error/api-error'
import { RequestHandler } from '../types/request-handlers/request-handler'
import { ApiRequest, ApiResponse } from '@echo/api-public'

export async function handleRequest<
  T,
  Q extends Partial<{
    [key: string]: string | string[]
  }>,
  U
>(req: ApiRequest<T, Q>, res: ApiResponse<U>, requestHandler: RequestHandler<T, Q, U>) {
  try {
    await requestHandler(req, res)
  } catch (error) {
    const apiError = error as ApiError
    apiError.endResponse(res)
    return
  }
}
