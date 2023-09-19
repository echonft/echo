import type { ApiRequest } from '@echo/api/types/base/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { cancelListingRequestHandler } from '@server/request-handlers/listing/cancel-listing-request-handler'

export async function POST(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, cancelListingRequestHandler, params.id)
}
