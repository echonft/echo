import { mapActivityToFirestoreData } from '../../../mappers/map-activity-to-firestore-data'
import { ErrorResponse } from '@echo/api-public'
import { FirestoreOfferData, FirestoreUserData, offerFirestoreData } from '@echo/firestore'
import { generateOfferActivity, OfferState } from '@echo/model'
import { NextApiResponse } from 'next'
import { append, assoc, modify, pipe } from 'ramda'

/**
 * Mock function. Make sure you use a valid ID else the call will fail
 * @param id
 * @param _user
 * @param state
 * @param _fromSender
 * @param res
 */
export const updateOfferState = (
  id: string,
  _user: FirestoreUserData,
  state: OfferState,
  _fromSender: boolean,
  res: NextApiResponse<FirestoreOfferData | ErrorResponse>
) => {
  const offer = offerFirestoreData[id]!
  const newActivity = generateOfferActivity(state, offer.state as OfferState)
  const newActivityData = mapActivityToFirestoreData(newActivity)
  const updatedOffer = pipe(
    modify('activities', append(newActivityData)),
    assoc('state', state)
  )(offer) as FirestoreOfferData
  res.status(200).json(updatedOffer)
  return
}
