import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { assertAllowedMethods } from '../../helpers/error/assert-allowed-methods'
import { parseUpdateOfferRequest } from '../../helpers/offer/parse-update-offer-request'
import { handleAcceptOffer } from './handle-accept-offer'
import { handleCancelOffer } from './handle-cancel-offer'
import { handleRejectOffer } from './handle-reject-offer'
import { ApiRequest, ApiResponse, EmptyResponse, UpdateOfferAction, UpdateOfferRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function updateOfferRequestHandler(
  req: ApiRequest<UpdateOfferRequest>,
  res: ApiResponse<EmptyResponse>,
  authOptions: AuthOptions
) {
  assertAllowedMethods(req, ['POST'])
  const { id, action } = parseUpdateOfferRequest(req.body)
  const user = await getUserFromSession(req, res, authOptions)
  switch (action) {
    case UpdateOfferAction.ACCEPT:
      return handleAcceptOffer(id, user, res)
    case UpdateOfferAction.CANCEL:
      return handleCancelOffer(id, user, res)
    case UpdateOfferAction.REJECT:
      return handleRejectOffer(id, user, res)
  }
}
