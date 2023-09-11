import { authOptions } from '@constants/auth-options'
import type { ApiRequest, UpdateListingRequest } from '@echo/api'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { updateListingRequestHandler } from '@server/request-handlers/listing/update-listing-request-handler'

export async function POST(request: ApiRequest<UpdateListingRequest>, { params }: { params: { id: string } }) {
  return await handleRestrictedRequest(request, authOptions, updateListingRequestHandler, params.id)
}
