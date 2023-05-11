import { RequestForOffer } from '../../types/request-for-offer'
import { RequestForOfferActivity } from '../../types/request-for-offer-activity'
import { RequestForOfferState } from '../../types/request-for-offer-state'
import dayjs from 'dayjs'

export function canAddRequestForOfferActivity(requestForOffer: RequestForOffer, activity: RequestForOfferActivity) {
  if (requestForOffer.state !== activity.fromState) {
    return false
  }
  // Can't add activity on an expired request for offer
  if (requestForOffer.expiresAt.isBefore(dayjs())) {
    return false
  }
  switch (requestForOffer.state) {
    // Can't add activity on an expired, cancelled or fulfilled request for offer
    case RequestForOfferState.CANCELLED:
    case RequestForOfferState.EXPIRED:
    case RequestForOfferState.FULFILLED:
      return false
    case RequestForOfferState.OFFER_RECEIVED:
      // Can't go back in state
      if (activity.toState === RequestForOfferState.CREATED) {
        return false
      }
      break
    case RequestForOfferState.PARTIALLY_FULFILLED:
      // We can have an offer received even if partially fulfilled
      // TODO Can we actually have two activities for partially fulfilled?
      // i.e. you accept 2 offers at the same time?
      if (activity.toState === RequestForOfferState.CREATED) {
        return false
      }
      break
    case RequestForOfferState.CREATED:
      if (
        activity.toState !== RequestForOfferState.OFFER_RECEIVED &&
        activity.toState !== RequestForOfferState.EXPIRED &&
        activity.toState !== RequestForOfferState.CANCELLED
      ) {
        return false
      }
  }
  return true
}
