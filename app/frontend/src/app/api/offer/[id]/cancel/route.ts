import type { ApiRequest } from '@echo/api/types/base/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { cancelOfferRequestHandler } from '@server/request-handlers/offer/cancel-offer-request-handler'

export async function POST(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, cancelOfferRequestHandler, params.id)
}
