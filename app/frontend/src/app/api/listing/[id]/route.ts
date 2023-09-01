import { authOptions } from '../../../../lib/constants/auth-options'
import { handleRestrictedRequest } from '../../../../lib/server/request-handlers/handle-restricted-request'
import { updateListingRequestHandler } from '../../../../lib/server/request-handlers/listing/update-listing-request-handler'
import { ApiRequest, UpdateListingRequest } from '@echo/api'

export async function POST(request: ApiRequest<UpdateListingRequest>, { params }: { params: { id: string } }) {
  return await handleRestrictedRequest(request, authOptions, updateListingRequestHandler, params.id)
}
