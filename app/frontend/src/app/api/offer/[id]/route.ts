import { ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getOfferRequestHandler } from '@server/request-handlers/offer/get-offer-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, getOfferRequestHandler, params.id)
}
