import { mapActivityToFirestoreData } from '../../mappers/activity/map-activity-to-firestore-data'
import {
  canAddRequestForOfferActivity,
  FirestoreActivityData,
  FirestoreOfferState,
  FirestoreRequestForOfferData,
  generateRequestForOfferActivity,
  generateRequestForOfferStateFromOfferState
} from '@echo/firestore'
import { unix } from 'dayjs'
import { isNil } from 'ramda'

export function checkRequestForOfferStatus(
  requestForOffer: FirestoreRequestForOfferData | undefined,
  offerState: FirestoreOfferState
): {
  activity: FirestoreActivityData | undefined
  requestForOffer: FirestoreRequestForOfferData | undefined
} {
  // Offer is tied to a request for offer, need to do some checks
  if (isNil(requestForOffer)) {
    return { activity: undefined, requestForOffer: undefined }
  }
  const newRequestForOfferState = generateRequestForOfferStateFromOfferState(offerState)
  const newRequestForOfferActivity = generateRequestForOfferActivity(newRequestForOfferState, requestForOffer.state)

  if (
    !canAddRequestForOfferActivity(requestForOffer.state, unix(requestForOffer.expiresAt), newRequestForOfferActivity)
  ) {
    throw new Error('Cannot update request for offer')
  }
  return { activity: mapActivityToFirestoreData(newRequestForOfferActivity), requestForOffer }
}
