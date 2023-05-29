import { mapActivityToFirestoreData } from '../../mappers/map-activity-to-firestore-data'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { RequestForOfferRequest } from '../../types/model/requests/request-for-offer-request'
import { idRequestSchema } from '../../types/validators/id-request'
import { validateAndExtractUserFromSession } from '../../utils/handler/validate-and-extract-user-from-session'
import { findRequestForOfferById, updateRequestForOfferActivities } from '@echo/firebase-admin'
import { FirestoreRequestForOfferData } from '@echo/firestore'
import { canAddRequestForOfferActivity, generateRequestForOfferActivity, RequestForOfferState } from '@echo/model'
import { castAs, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { unix } from 'dayjs'
import { append, assoc, isNil, modify, pipe } from 'ramda'

export const cancelRequestForOfferHandler: RequestHandler<
  ApiRequest<RequestForOfferRequest, never>,
  FirestoreRequestForOfferData
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
        const cancelledActivity = generateRequestForOfferActivity(
          RequestForOfferState.CANCELLED,
          requestForOffer.state as RequestForOfferState
        )
        if (
          !canAddRequestForOfferActivity(
            requestForOffer.state as RequestForOfferState,
            unix(requestForOffer.expiresAt),
            cancelledActivity
          )
        ) {
          res.end(res.status(401).json({ error: 'Cannot cancel listing' }))
          return
        }
        const cancelledActivityData = mapActivityToFirestoreData(cancelledActivity)
        const updatedRequestForOffer = pipe(
          modify('activities', append(cancelledActivityData)),
          assoc('state', RequestForOfferState.CANCELLED),
          castAs<FirestoreRequestForOfferData>
        )(requestForOffer)
        return updateRequestForOfferActivities(requestForOffer.id, requestForOffer.activities, cancelledActivityData)
          .then(() => {
            res.status(200).json(updatedRequestForOffer)
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
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    logger.error(`Invalid body: ${e}`)
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
