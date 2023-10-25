import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { rejectOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/reject-offer-request-handler'

export async function POST(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, rejectOfferRequestHandler, params.id)
}
