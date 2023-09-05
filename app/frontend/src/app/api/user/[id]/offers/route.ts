import { handleRequest } from '../../../../../lib/server/request-handlers/handle-request'
import { getUserOffersRequestHandler } from '../../../../../lib/server/request-handlers/user/get-user-offers-request-handler'
import { ApiRequest } from '@echo/api'

export async function GET(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, getUserOffersRequestHandler, params.id)
}
