import { FirestoreRequestForOfferState } from '../../types/model/data/request-for-offer/firestore-request-for-offer-state'
import { FirestoreRequestForOfferActivityPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-activity-prototype'
import dayjs, { Dayjs } from 'dayjs'

export function canAddRequestForOfferActivity(
  state: FirestoreRequestForOfferState,
  expiresAt: Dayjs,
  activity: FirestoreRequestForOfferActivityPrototype
) {
  if (state !== activity.fromState) {
    return false
  }
  // Can't add activity on an expired request for offer
  if (expiresAt.isBefore(dayjs())) {
    return false
  }
  switch (state) {
    // Can't add activity on an expired, cancelled or fulfilled request for offer
    case 'CANCELLED':
    case 'EXPIRED':
    case 'FULFILLED':
      return false
    case 'OFFER_RECEIVED':
      // Can't go back in state
      if (activity.toState === 'CREATED') {
        return false
      }
      break
    case 'PARTIALLY_FULFILLED':
      // We can have an offer received even if partially fulfilled
      // TODO Can we actually have two activities for partially fulfilled?
      // i.e. you accept 2 offers at the same time?
      if (activity.toState === 'CREATED') {
        return false
      }
      break
    case 'CREATED':
      if (activity.toState !== 'OFFER_RECEIVED' && activity.toState !== 'EXPIRED' && activity.toState !== 'CANCELLED') {
        return false
      }
  }
  return true
}
