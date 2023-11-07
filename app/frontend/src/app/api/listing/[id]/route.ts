import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getListingRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/get-listing-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, getListingRequestHandler)(params.id)
}
