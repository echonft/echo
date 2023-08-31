import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { createListingRequestHandler } from '../../request-handlers/listing/create-listing-request-handler'
import { ApiRequest, CreateListingRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function createListingRouteHandler(req: ApiRequest<CreateListingRequest>, authOptions: AuthOptions) {
  return await handleRestrictedRequest(req, authOptions, createListingRequestHandler)
}
