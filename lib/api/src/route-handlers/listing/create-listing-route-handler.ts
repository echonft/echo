import { handleRestrictedRequest } from '../../request-handlers/handle-restricted-request'
import { createListingRequestHandler } from '../../request-handlers/listing/create-listing-request-handler'
import { ApiRequest, ApiResponse, CreateListingRequest, IdResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export function createListingRouteHandler(
  req: ApiRequest<CreateListingRequest>,
  res: ApiResponse<IdResponse>,
  authOptions: AuthOptions
) {
  return handleRestrictedRequest(req, res, authOptions, createListingRequestHandler)
}
