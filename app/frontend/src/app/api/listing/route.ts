import { authOptions } from '@constants/auth-options'
import type { ApiRequest, CreateListingRequest } from '@echo/api'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { createListingRequestHandler } from '@server/request-handlers/listing/create-listing-request-handler'

export async function PUT(request: ApiRequest<CreateListingRequest>) {
  return await handleRestrictedRequest(request, authOptions, createListingRequestHandler)
}
