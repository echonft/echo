import { FirestoreOfferState } from '../../types/model/data/offer/firestore-offer-state'
import { FirestoreOfferActivityPrototype } from '../../types/prototypes/offer/firestore-offer-activity-prototype'
import dayjs from 'dayjs'

export function generateOfferActivity(
  toState: FirestoreOfferState,
  fromState?: FirestoreOfferState
): FirestoreOfferActivityPrototype {
  return { toState, fromState: fromState, date: dayjs() }
}
