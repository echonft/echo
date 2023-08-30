import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { updateListingRequestHandler } from '../../request-handlers/listing/update-listing-request-handler'
import { ApiRequest, UpdateListingRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function updateListingRouteHandler(req: ApiRequest<UpdateListingRequest>, authOptions: AuthOptions) {
  return await handleRestrictedRequest(req, authOptions, updateListingRequestHandler)
}
