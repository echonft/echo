import dayjs from 'dayjs'
import { RequestForOfferActivity } from '../../types/request-for-offer-activity'
import { RequestForOfferState } from '../../types/request-for-offer-state'

export function generateRequestForOfferActivity(
  toState: RequestForOfferState,
  fromState?: RequestForOfferState
): RequestForOfferActivity {
  return { toState, fromState, date: dayjs() }
}
