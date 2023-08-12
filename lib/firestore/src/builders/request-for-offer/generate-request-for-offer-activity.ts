import { FirestoreRequestForOfferState } from '../../types/model/data/request-for-offer/firestore-request-for-offer-state'
import { FirestoreRequestForOfferActivityPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-activity-prototype'
import dayjs from 'dayjs'

export function generateRequestForOfferActivity(
  toState: FirestoreRequestForOfferState,
  fromState?: FirestoreRequestForOfferState
): FirestoreRequestForOfferActivityPrototype {
  return { toState, fromState: fromState ?? undefined, date: dayjs() }
}
