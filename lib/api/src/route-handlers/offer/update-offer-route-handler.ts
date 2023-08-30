import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { updateOfferRequestHandler } from '../../request-handlers/offer/update-offer-request-handler'
import { ApiRequest, UpdateOfferRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function updateOfferRouteHandler(req: ApiRequest<UpdateOfferRequest>, authOptions: AuthOptions) {
  return await handleRestrictedRequest(req, authOptions, updateOfferRequestHandler)
}
