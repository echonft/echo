import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { createOfferRequestHandler } from '../../request-handlers/offer/create-offer-request-handler'
import { ApiRequest, ApiResponse, CreateOfferRequest, IdResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export function createOfferRouteHandler(
  req: ApiRequest<CreateOfferRequest>,
  res: ApiResponse<IdResponse>,
  authOptions: AuthOptions
) {
  return handleRestrictedRequest(req, res, authOptions, createOfferRequestHandler)
}
