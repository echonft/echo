import { RequestForOfferActivity } from '../../types/request-for-offer-activity'
import { RequestForOfferState } from '../../types/request-for-offer-state'
import dayjs from 'dayjs'

export function generateRequestForOfferActivity(
  toState: RequestForOfferState,
  fromState?: RequestForOfferState
): RequestForOfferActivity {
  return { toState, fromState, date: dayjs() }
}
