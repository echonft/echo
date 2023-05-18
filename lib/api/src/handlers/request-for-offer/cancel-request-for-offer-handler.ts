import { mapRequestForOfferToResponse } from '../../mappers/map-request-for-offer-to-response'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { RequestForOfferRequest } from '../../types/model/requests/request-for-offer-request'
import { RequestForOfferResponse } from '../../types/model/responses/request-for-offer-response'
import { idRequestSchema } from '../../types/validators/id-request'
import { validateAndExtractUserFromSession } from '../../utils/handler/validate-and-extract-user-from-session'
import { findRequestForOfferById, updateRequestForOfferActivities } from '@echo/firebase-admin'
import {
  canAddRequestForOfferActivity,
  generateRequestForOfferActivity,
  RequestForOffer,
  RequestForOfferState
} from '@echo/model'
import { logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { append, assoc, isNil, modify, pipe } from 'ramda'

export const cancelRequestForOfferHandler: RequestHandler<
  ApiRequest<RequestForOfferRequest, never>,
  RequestForOfferResponse
> = async (req, res, session) => {
  const user = validateAndExtractUserFromSession(session, res)
  if (isNil(user)) {
    return
  }
  try {
    const { id } = idRequestSchema.parse(req.body)
    return findRequestForOfferById(id)
      .then((requestForOfferResult) => {
        if (R.isError(requestForOfferResult)) {
          res.end(res.status(401).json({ error: 'Invalid listing id' }))
          return
        }
        const requestForOffer = R.getExn(requestForOfferResult)
        if (requestForOffer.sender.id !== user.id) {
          res.end(res.status(401).json({ error: 'Cannot cancel listing' }))
          return
        }
        const cancelledActivity = generateRequestForOfferActivity(RequestForOfferState.CANCELLED, requestForOffer.state)
        if (!canAddRequestForOfferActivity(requestForOffer, cancelledActivity)) {
          res.end(res.status(401).json({ error: 'Cannot cancel listing' }))
          return
        }
        const updatedRequestForOffer = pipe<[RequestForOffer], RequestForOffer, RequestForOffer>(
          modify('activities', append(cancelledActivity)),
          assoc('state', RequestForOfferState.CANCELLED)
        )(requestForOffer)
        return updateRequestForOfferActivities(requestForOffer.id, requestForOffer.activities, cancelledActivity)
          .then(() => {
            res.status(200).json(mapRequestForOfferToResponse(updatedRequestForOffer))
            return
          })
          .catch((e: Error) => {
            logger.error(`Error cancelling request for offer: ${JSON.stringify(e)}`)
            res.end(res.status(500).json({ error: 'Could not cancel listing' }))
            return
          })
      })
      .catch(() => {
        res.end(res.status(401).json({ error: 'Invalid listing id' }))
        return
      })
  } catch {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
