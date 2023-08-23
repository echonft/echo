import { Offer } from './offer'
import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

export interface Swap {
  id: string
  expired: boolean
  expiresAt: Dayjs
  offer: Offer
  state: SwapState
}
