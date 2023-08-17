import { ListingState } from './listing-state'
import { OfferState } from './offer-state'
import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

export interface Activity {
  date: Dayjs
  fromState: OfferState | ListingState | SwapState | undefined
  toState: OfferState | ListingState | SwapState
}
