import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { cancelListingRequestHandler } from '../../request-handlers/listing/cancel-listing-request-handler'
import { ApiRequest, ApiResponse, EmptyResponse, IdRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export function cancelListingRouteHandler(
  req: ApiRequest<IdRequest>,
  res: ApiResponse<EmptyResponse>,
  authOptions: AuthOptions
) {
  return handleRestrictedRequest(req, res, authOptions, cancelListingRequestHandler)
}
