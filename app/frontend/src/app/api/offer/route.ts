import { authOptions } from '@constants/auth-options'
import type { ApiRequest, CreateOfferRequest } from '@echo/api/types'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { createOfferRequestHandler } from '@server/request-handlers/offer/create-offer-request-handler'

export async function PUT(request: ApiRequest<CreateOfferRequest>) {
  return await handleRestrictedRequest(request, authOptions, createOfferRequestHandler)
}
