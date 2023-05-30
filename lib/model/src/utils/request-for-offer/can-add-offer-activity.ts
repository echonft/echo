import { OfferActivity } from '../../types/offer-activity'
import { OfferState } from '../../types/offer-state'
import dayjs, { Dayjs } from 'dayjs'

export function canAddOfferActivity(state: OfferState, expiresAt: Dayjs, activity: OfferActivity) {
  if (state !== activity.fromState) {
    return false
  }

  // Can't add activity on an expired request for offer
  if (expiresAt.isBefore(dayjs())) {
    return false
  }
  switch (state) {
    case OfferState.OPEN:
      return true
    // Can't add activity on an expired, cancelled or fulfilled request for offer
    // TODO: Can you cancel once accepted?
    case OfferState.CANCELLED:
    case OfferState.EXPIRED:
    case OfferState.COMPLETED:
    case OfferState.REJECTED:
      return false
    case OfferState.ACCEPTED:
      // TODO can it expires after accepted? Can user cancel or reject after acceptance?
      if (activity.toState === OfferState.COMPLETED) {
        return true
      }
  }
  return false
}
