import { OfferState } from './offer-state'
import { Dayjs } from 'dayjs'

export interface OfferActivity {
  id: string
  date: Dayjs
  fromState: OfferState | undefined
  toState: OfferState
  data?: object
}
