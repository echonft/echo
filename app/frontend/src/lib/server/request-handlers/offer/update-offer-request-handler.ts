import { ApiRequest, UpdateOfferAction, UpdateOfferRequest } from '@echo/api'
import { getUserFromSession } from '@server/helpers/auth/get-user-from-session'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { handleAcceptOffer } from '@server/request-handlers/offer/handle-accept-offer'
import { handleCancelOffer } from '@server/request-handlers/offer/handle-cancel-offer'
import { handleRejectOffer } from '@server/request-handlers/offer/handle-reject-offer'
import { updateOfferRequestSchema } from '@server/validators/update-offer-request-schema'
import type { AuthOptions } from 'next-auth'

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
    throw new BadRequestError(`error parsing update offer request ${JSON.stringify(request)}`, e)
  }
}
