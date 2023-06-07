import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { UpdateOfferAction } from '../../types/model/helper/update-offer-action'
import { UpdateOfferRequest } from '../../types/model/requests/update-offer-request'
import { updateOfferRequestSchema } from '../../types/validators/update-offer-request'
import { updateOfferState } from '../../utils/handler/update-offer-state'
import { validateAndExtractUserFromSession } from '../../utils/handler/validate-and-extract-user-from-session'
import { FirestoreOfferData } from '@echo/firestore'
import { OfferState } from '@echo/model'
import { isNil } from 'ramda'

export const updateOfferHandler: RequestHandler<ApiRequest<UpdateOfferRequest, never>, FirestoreOfferData> = async (
  req,
  res,
  session
) => {
  const user = validateAndExtractUserFromSession(session, res)
  if (isNil(user)) {
    return
  }
  try {
    const { id, action } = updateOfferRequestSchema.parse(req.body)
    switch (action) {
      case UpdateOfferAction.ACCEPT:
        return updateOfferState(id, user, OfferState.ACCEPTED, false, res)
      case UpdateOfferAction.CANCEL:
        return updateOfferState(id, user, OfferState.CANCELLED, true, res)
      case UpdateOfferAction.REJECT:
        return updateOfferState(id, user, OfferState.REJECTED, false, res)
    }
  } catch (e) {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
