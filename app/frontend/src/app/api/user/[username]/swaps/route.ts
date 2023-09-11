import type { ApiRequest } from '@echo/api'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getUserCompletedOffersRequestHandler } from '@server/request-handlers/user/get-user-completed-offers-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserCompletedOffersRequestHandler, params.username)
}
