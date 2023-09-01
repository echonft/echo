import { authOptions } from '../../../../lib/constants/auth-options'
import { handleRestrictedRequest } from '../../../../lib/server/request-handlers/handle-restricted-request'
import { updateOfferRequestHandler } from '../../../../lib/server/request-handlers/offer/update-offer-request-handler'
import { ApiRequest, UpdateOfferRequest } from '@echo/api-public'

export async function POST(request: ApiRequest<UpdateOfferRequest>, { params }: { params: { id: string } }) {
  return await handleRestrictedRequest(request, authOptions, updateOfferRequestHandler, params.id)
}
