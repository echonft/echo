import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { cancelListingRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/cancel-listing-request-handler'

export async function POST(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, cancelListingRequestHandler, params.id)
}
