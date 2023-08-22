import { ApiError } from '../../helpers/api-error'
import { parseUpdateOfferRequest } from '../../helpers/offer/parse-update-offer-request'
import { RequestHandler } from '../../types/handlers/request-handler'
import { handleAcceptOffer } from './handle-accept-offer'
import { handleCancelOffer } from './handle-cancel-offer'
import { handleRejectOffer } from './handle-reject-offer'
import { ApiRequest, EmptyResponse, UpdateOfferAction, UpdateOfferRequest } from '@echo/api-public'

export const updateOfferHandler: RequestHandler<ApiRequest<UpdateOfferRequest, never>, EmptyResponse> = async (
  req,
  res,
  session
) => {
  try {
    const { id, action } = parseUpdateOfferRequest(req.body)
    switch (action) {
      case UpdateOfferAction.ACCEPT:
        return handleAcceptOffer(id, session, res)
      case UpdateOfferAction.CANCEL:
        return handleCancelOffer(id, session, res)
      case UpdateOfferAction.REJECT:
        return handleRejectOffer(id, session, res)
    }
  } catch (e) {
    const { status, message } = e as ApiError
    res.end(res.status(status).json({ error: message }))
    return
  }
}
