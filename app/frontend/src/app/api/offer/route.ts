import { authOptions } from '@constants/auth-options'
import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { createOfferRequestHandler } from '@server/request-handlers/offer/create-offer-request-handler'

export async function PUT(request: ApiRequest<CreateOfferRequest>) {
  return await handleRestrictedRequest(request, authOptions, createOfferRequestHandler)
}
