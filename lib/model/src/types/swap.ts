import { Offer } from './offer'
import { SwapActivity } from './swap-activity'
import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

// TODO Validate data here
export interface Swap {
  id: string
  state: SwapState
  offer: Offer
  activities?: SwapActivity[]
  expiresAt: Dayjs
  createdAt: Dayjs
}
