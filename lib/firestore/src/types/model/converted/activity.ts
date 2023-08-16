import { OfferState } from './offer-state'
import { RequestForOfferState } from './request-for-offer-state'
import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

export interface Activity {
  date: Dayjs
  fromState: OfferState | RequestForOfferState | SwapState | undefined
  toState: OfferState | RequestForOfferState | SwapState
}
