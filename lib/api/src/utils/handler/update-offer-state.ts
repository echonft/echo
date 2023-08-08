import { mapActivityToFirestoreData } from '../../mappers/map-activity-to-firestore-data'
import { checkRequestForOfferStatus } from './check-request-for-offer-status'
import { ErrorResponse } from '@echo/api-public'
import {
  findOfferById,
  findRequestForOfferByOfferId,
  updateOfferActivities,
  updateRequestForOfferActivities
} from '@echo/firebase-admin'
import { FirestoreOfferData, FirestoreUserData } from '@echo/firestore'
import { canAddOfferActivity, generateOfferActivity, OfferState } from '@echo/model'
import { castAs, errorMessage, logger } from '@echo/utils'
import { unix } from 'dayjs'
import { NextApiResponse } from 'next'
import { append, assoc, isNil, modify, pipe } from 'ramda'

export const updateOfferState = (
  id: string,
  user: FirestoreUserData,
  state: OfferState,
  fromSender: boolean,
  res: NextApiResponse<FirestoreOfferData | ErrorResponse>
) =>
  findOfferById(id)
    .then((offer) => {
      // TODO Can the receiver cancel? or it's decline?
      // Some actions can be done by sender, others by receiver
      if (fromSender ? offer.sender.id !== user.id : offer.receiver.id !== user.id) {
        res.end(res.status(401).json({ error: 'Cannot update offer' }))
        return
      }
      return findRequestForOfferByOfferId(offer.id)
        .then((requestForOfferData) => {
          const newActivity = generateOfferActivity(state, offer.state as OfferState)
          if (!canAddOfferActivity(offer.state as OfferState, unix(offer.expiresAt), newActivity)) {
            res.end(res.status(401).json({ error: 'Cannot update offer' }))
            return
          }
          try {
            const { activity: requestForOfferActivity, requestForOffer } = checkRequestForOfferStatus(
              requestForOfferData,
              newActivity.toState
            )
            const newActivityData = mapActivityToFirestoreData(newActivity)
            const updatedOffer = pipe(
              modify('activities', append(newActivityData)),
              assoc('state', state),
              castAs<FirestoreOfferData>
            )(offer)

            return updateOfferActivities(updatedOffer.id, updatedOffer.activities, newActivityData)
              .then(() => {
                if (!isNil(requestForOfferActivity) && !isNil(requestForOffer)) {
                  return updateRequestForOfferActivities(
                    requestForOffer.id,
                    requestForOffer.activities,
                    requestForOfferActivity
                  )
                    .then(() => {
                      res.status(200).json(updatedOffer)
                      return
                      // TODO: Should we still return here? The offer is updated, but not the request for offer?
                    })
                    .catch((e) => {
                      logger.error(`updateOfferState Error updating request for offer: ${errorMessage(e)}`)
                      res.status(200).json(updatedOffer)
                      return
                    })
                }
                res.status(200).json(updatedOffer)
                return
              })
              .catch((e) => {
                logger.error(`updateOfferState Error updating offer: ${errorMessage(e)}`)
                res.end(res.status(500).json({ error: 'Could not update offer' }))
                return
              })
          } catch (e) {
            logger.error(`updateOfferState Can't update Request For Offer: ${errorMessage(e)}`)
            res.end(res.status(401).json({ error: 'Cannot update offer' }))
            return
          }
        })
        .catch((e) => {
          logger.error(`updateOfferState Error fetching request for offer offer: ${errorMessage(e)}`)
          res.end(res.status(500).json({ error: 'Could not update offer' }))
          return
        })
    })
    .catch((e) => {
      logger.error(`updateOfferState error thrown on findOfferById: ${errorMessage(e)}`)
      res.end(res.status(401).json({ error: 'Invalid offer id' }))
      return
    })
