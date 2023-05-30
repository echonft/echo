import { mapActivityToFirestoreData } from '../../mappers/map-activity-to-firestore-data'
import { FirestoreRequestForOfferActivityData, FirestoreRequestForOfferData } from '@echo/firestore'
import {
  canAddRequestForOfferActivity,
  generateRequestForOfferActivity,
  generateRequestForOfferStateFromOfferState,
  OfferState,
  RequestForOfferState
} from '@echo/model'
import { R } from '@mobily/ts-belt'
import { unix } from 'dayjs'

export function checkRequestForOfferStatus(
  requestForOfferResult: R.Result<FirestoreRequestForOfferData, Error>,
  offerState: OfferState
): {
  activity: FirestoreRequestForOfferActivityData | undefined
  requestForOffer: FirestoreRequestForOfferData | undefined
} {
  // Offer is tied to a request for offer, need to do some checks
  if (R.isOk(requestForOfferResult)) {
    const newRequestForOfferState = generateRequestForOfferStateFromOfferState(offerState)
    const requestForOffer = R.getExn(requestForOfferResult)
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
  return { activity: undefined, requestForOffer: undefined }
}
