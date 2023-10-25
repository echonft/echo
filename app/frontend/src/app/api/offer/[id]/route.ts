import { ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/get-offer-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, getOfferRequestHandler, params.id)
}
