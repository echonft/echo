import { ApiError } from '../helpers/error/api-error'
import { RestrictedRequestHandler } from '../types/request-handlers/restricted-request-handler'
import { ApiRequest, ApiResponse, ErrorResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function handleRestrictedRequest<
  T,
  Q extends Partial<{
    [key: string]: string | string[]
  }>,
  U
>(
  req: ApiRequest<T, Q>,
  res: ApiResponse<U | ErrorResponse>,
  authOptions: AuthOptions,
  requestHandler: RestrictedRequestHandler<T, Q, U>
) {
  try {
    await requestHandler(req, res, authOptions)
  } catch (error) {
    const apiError = error as ApiError
    apiError.endResponse(res)
    return
  }
}
