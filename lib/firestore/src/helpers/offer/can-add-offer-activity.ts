import { FirestoreOfferState } from '../../types/model/data/offer/firestore-offer-state'
import { FirestoreOfferActivityPrototype } from '../../types/prototypes/offer/firestore-offer-activity-prototype'
import dayjs, { Dayjs } from 'dayjs'

export function canAddOfferActivity(
  state: FirestoreOfferState,
  expiresAt: Dayjs,
  activity: FirestoreOfferActivityPrototype
) {
  if (state !== activity.fromState) {
    return false
  }

  // Can't add activity on an expired request for offer
  if (expiresAt.isBefore(dayjs())) {
    return false
  }
  switch (state) {
    case 'OPEN':
      return true
    // Can't add activity on an expired, cancelled or fulfilled request for offer
    // TODO: Can you cancel once accepted?
    case 'CANCELLED':
    case 'EXPIRED':
    case 'COMPLETED':
    case 'REJECTED':
      return false
    case 'ACCEPTED':
      // TODO can it expires after accepted? Can user cancel or reject after acceptance?
      if (activity.toState === 'COMPLETED') {
        return true
      }
  }
  return false
}
