import { type ApiRequest } from '@echo/api/types/api-request'
import type { AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { acceptOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/accept-offer-request-handler'

export async function POST(request: ApiRequest<AcceptOfferRequest>, { params }: { params: { id: string } }) {
  return await handleRequest(request, acceptOfferRequestHandler, params.id)
}
