import { OfferState } from './offer-state'
import { Dayjs } from 'dayjs'

export interface OfferActivity {
  date: Dayjs
  fromState: OfferState | undefined
  toState: OfferState
}
