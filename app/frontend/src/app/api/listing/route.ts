import { authOptions } from '../../../lib/constants/auth-options'
import { handleRestrictedRequest } from '../../../lib/server/request-handlers/handle-restricted-request'
import { createListingRequestHandler } from '../../../lib/server/request-handlers/listing/create-listing-request-handler'
import { ApiRequest, CreateListingRequest } from '@echo/api'

export async function PUT(request: ApiRequest<CreateListingRequest>) {
  return await handleRestrictedRequest(request, authOptions, createListingRequestHandler)
}
