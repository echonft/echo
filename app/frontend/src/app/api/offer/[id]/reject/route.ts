import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { rejectOfferRequestHandler } from '@server/request-handlers/offer/reject-offer-request-handler'

export async function POST(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, rejectOfferRequestHandler, params.id)
}
