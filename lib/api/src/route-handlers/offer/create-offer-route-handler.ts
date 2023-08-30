import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { createOfferRequestHandler } from '../../request-handlers/offer/create-offer-request-handler'
import { ApiRequest, CreateOfferRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function createOfferRouteHandler(req: ApiRequest<CreateOfferRequest>, authOptions: AuthOptions) {
  return await handleRestrictedRequest(req, authOptions, createOfferRequestHandler)
}
