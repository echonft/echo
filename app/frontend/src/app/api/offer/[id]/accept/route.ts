import type { ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { acceptOfferRequestHandler } from '@server/request-handlers/offer/accept-offer-request-handler'

export async function POST(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, acceptOfferRequestHandler, params.id)
}
