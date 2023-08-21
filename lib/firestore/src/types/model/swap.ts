import { Offer } from './offer'
import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

export interface Swap {
  id: string
  createdAt: Dayjs
  expired: boolean
  expiresAt: Dayjs
  offer: Offer
  postedAt: Dayjs | undefined
  state: SwapState
}
