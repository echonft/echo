import { authOptions } from '@constants/auth-options'
import type { ApiRequest } from '@echo/api/types/base/api-request'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { getCurrentUserOffersRequestHandler } from '@server/request-handlers/user/get-current-user-offers-request-handler'

export async function GET(request: ApiRequest<never>) {
  return await handleRestrictedRequest(request, authOptions, getCurrentUserOffersRequestHandler)
}
