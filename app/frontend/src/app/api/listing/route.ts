import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { createListingRequestHandler } from '@server/request-handlers/listing/create-listing-request-handler'

export async function PUT(request: ApiRequest<CreateListingRequest>) {
  return await handleRequest(request, createListingRequestHandler)
}
