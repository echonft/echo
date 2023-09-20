import type { ApiRequest } from '@echo/api/types/base/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getCurrentUserOffersRequestHandler } from '@server/request-handlers/user/get-current-user-offers-request-handler'

export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, getCurrentUserOffersRequestHandler)
}
