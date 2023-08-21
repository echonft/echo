import { getUserFromSession } from '../../helpers/handler/get-user-from-session'
import { updateOfferState } from '../../helpers/handler/update-offer-state'
import { RequestHandler } from '../../types/handlers/request-handler'
import { updateOfferRequestSchema } from '../../types/validators/update-offer-request'
import { ApiRequest, UpdateOfferAction, UpdateOfferRequest, UpdateOfferResponse } from '@echo/api-public'
import { isNil } from 'ramda'

export const updateOfferHandler: RequestHandler<ApiRequest<UpdateOfferRequest, never>, UpdateOfferResponse> = async (
  req,
  res,
  session
) => {
  const user = getUserFromSession(session, res)
  if (isNil(user)) {
    return
  }
  try {
    const { id, action } = updateOfferRequestSchema.parse(req.body)
    switch (action) {
      case UpdateOfferAction.ACCEPT:
        return updateOfferState(id, user, 'ACCEPTED', false, res)
      case UpdateOfferAction.CANCEL:
        return updateOfferState(id, user, 'CANCELLED', true, res)
      case UpdateOfferAction.REJECT:
        return updateOfferState(id, user, 'REJECTED', false, res)
    }
  } catch (e) {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
