import { authOptions } from '@constants/auth-options'
import type { ApiRequest, UpdateOfferRequest } from '@echo/api/types'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { updateOfferRequestHandler } from '@server/request-handlers/offer/update-offer-request-handler'

export async function POST(request: ApiRequest<UpdateOfferRequest>, { params }: { params: { id: string } }) {
  return await handleRestrictedRequest(request, authOptions, updateOfferRequestHandler, params.id)
}
