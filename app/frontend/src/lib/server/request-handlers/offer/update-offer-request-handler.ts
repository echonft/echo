import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { BadRequestError } from '../../helpers/error/bad-request-error'
import { updateOfferRequestSchema } from '../../validators/update-offer-request-schema'
import { handleAcceptOffer } from './handle-accept-offer'
import { handleCancelOffer } from './handle-cancel-offer'
import { handleRejectOffer } from './handle-reject-offer'
import { ApiRequest, UpdateOfferAction, UpdateOfferRequest } from '@echo/api'
import { AuthOptions } from 'next-auth'

export async function updateOfferRequestHandler(
  req: ApiRequest<UpdateOfferRequest>,
  authOptions: AuthOptions,
  id: string
) {
  const requestBody = await req.json()
  const { action } = parseUpdateOfferRequest(requestBody)
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

function parseUpdateOfferRequest(request: UpdateOfferRequest) {
  try {
    return updateOfferRequestSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
