import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { createOfferRequestHandler } from '@server/request-handlers/offer/create-offer-request-handler'

export async function PUT(request: ApiRequest<CreateOfferRequest>) {
  return await handleRequest(request, createOfferRequestHandler)
}
