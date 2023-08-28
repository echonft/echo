import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { updateListingRequestHandler } from '../../request-handlers/listing/update-listing-request-handler'
import { ApiRequest, ApiResponse, EmptyResponse, UpdateListingRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export function updateListingRouteHandler(
  req: ApiRequest<UpdateListingRequest>,
  res: ApiResponse<EmptyResponse>,
  authOptions: AuthOptions
) {
  return handleRestrictedRequest(req, res, authOptions, updateListingRequestHandler)
}
