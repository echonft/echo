import { Offer } from './offer'
import { SwapActivity } from './swap-activity'
import { SwapState } from './swap-state'
import dayjs from 'dayjs'

export interface Swap {
  id: string
  state: SwapState
  offer: Offer
  activities?: SwapActivity[]
  expiresAt: dayjs.Dayjs
  createdAt: dayjs.Dayjs
}
