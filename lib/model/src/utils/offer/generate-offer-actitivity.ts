import { OfferActivity } from '../../types/offer-activity'
import { OfferState } from '../../types/offer-state'
import dayjs from 'dayjs'

export function generateOfferActivity(toState: OfferState, fromState?: OfferState): OfferActivity {
  return { toState, fromState: fromState ?? undefined, date: dayjs() }
}
