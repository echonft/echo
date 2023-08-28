import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { updateOfferRequestHandler } from '../../request-handlers/offer/update-offer-request-handler'
import { ApiRequest, ApiResponse, EmptyResponse, UpdateOfferRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export function updateOfferRouteHandler(
  req: ApiRequest<UpdateOfferRequest>,
  res: ApiResponse<EmptyResponse>,
  authOptions: AuthOptions
) {
  return handleRestrictedRequest(req, res, authOptions, updateOfferRequestHandler)
}
