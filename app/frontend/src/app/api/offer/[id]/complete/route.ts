import { type ApiRequest } from '@echo/api/types/api-request'
import type { CompleteOfferRequest } from '@echo/api/types/requests/complete-offer-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { completeOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/complete-offer-request-handler'

export async function POST(request: ApiRequest<CompleteOfferRequest>, { params }: { params: { id: string } }) {
  return await handleRequest(request, completeOfferRequestHandler)(request, params.id)
}
