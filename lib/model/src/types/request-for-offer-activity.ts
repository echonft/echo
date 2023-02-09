import { RequestForOfferState } from './request-for-offer-state'
import { Dayjs } from 'dayjs'

export interface RequestForOfferActivity {
  id: string
  date: Dayjs
  fromState: RequestForOfferState | undefined
  toState: RequestForOfferState
  data?: object
}
