import { RequestForOfferState } from './request-for-offer-state'
import dayjs from 'dayjs'

export interface RequestForOfferActivity {
  date: dayjs.Dayjs
  fromState: RequestForOfferState | undefined
  toState: RequestForOfferState
}
