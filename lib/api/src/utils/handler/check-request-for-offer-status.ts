import { mapActivityToFirestoreData } from '../../mappers/map-activity-to-firestore-data'
import { FirestoreRequestForOfferActivityData, FirestoreRequestForOfferData } from '@echo/firestore'
import {
  canAddRequestForOfferActivity,
  generateRequestForOfferActivity,
  generateRequestForOfferStateFromOfferState,
  OfferState,
  RequestForOfferState
} from '@echo/model'
import { unix } from 'dayjs'
import { isNil } from 'ramda'

export function checkRequestForOfferStatus(
  requestForOffer: FirestoreRequestForOfferData | undefined,
  offerState: OfferState
): {
  activity: FirestoreRequestForOfferActivityData | undefined
  requestForOffer: FirestoreRequestForOfferData | undefined
} {
  // Offer is tied to a request for offer, need to do some checks
  if (isNil(requestForOffer)) {
    return { activity: undefined, requestForOffer: undefined }
  }
  const newRequestForOfferState = generateRequestForOfferStateFromOfferState(offerState)
  const newRequestForOfferActivity = generateRequestForOfferActivity(
    newRequestForOfferState,
    requestForOffer.state as RequestForOfferState
  )

  if (
    !canAddRequestForOfferActivity(
      requestForOffer.state as RequestForOfferState,
      unix(requestForOffer.expiresAt),
      newRequestForOfferActivity
    )
  ) {
    throw new Error('Cannot update request for offer')
  }
  return { activity: mapActivityToFirestoreData(newRequestForOfferActivity), requestForOffer }
}
