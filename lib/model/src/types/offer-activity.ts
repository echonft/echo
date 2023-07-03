import { OfferState } from './offer-state'
import dayjs from 'dayjs'

export interface OfferActivity {
  date: dayjs.Dayjs
  fromState: OfferState | undefined
  toState: OfferState
}
