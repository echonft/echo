import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { createListingRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/create-listing-request-handler'

export async function PUT(request: ApiRequest<CreateListingRequest>) {
  return await handleRequest(request, createListingRequestHandler)(request)
}
