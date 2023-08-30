import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { parseUpdateOfferRequest } from '../../helpers/offer/parse-update-offer-request'
import { handleAcceptOffer } from './handle-accept-offer'
import { handleCancelOffer } from './handle-cancel-offer'
import { handleRejectOffer } from './handle-reject-offer'
import { ApiRequest, UpdateOfferAction, UpdateOfferRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function updateOfferRequestHandler(req: ApiRequest<UpdateOfferRequest>, authOptions: AuthOptions) {
  const requestBody = await req.json()
  const { id, action } = parseUpdateOfferRequest(requestBody)
  const user = await getUserFromSession(authOptions)
  switch (action) {
    case UpdateOfferAction.ACCEPT:
      return handleAcceptOffer(id, user)
    case UpdateOfferAction.CANCEL:
      return handleCancelOffer(id, user)
    case UpdateOfferAction.REJECT:
      return handleRejectOffer(id, user)
  }
}
