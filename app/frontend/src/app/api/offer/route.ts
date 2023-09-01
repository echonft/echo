import { authOptions } from '../../../lib/constants/auth-options'
import { handleRestrictedRequest } from '../../../lib/server/request-handlers/handle-restricted-request'
import { createOfferRequestHandler } from '../../../lib/server/request-handlers/offer/create-offer-request-handler'
import { ApiRequest, CreateOfferRequest } from '@echo/api'

export async function PUT(request: ApiRequest<CreateOfferRequest>) {
  return await handleRestrictedRequest(request, authOptions, createOfferRequestHandler)
}
