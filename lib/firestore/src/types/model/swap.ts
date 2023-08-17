import { Activity } from './activity'
import { Offer } from './offer'
import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

export interface Swap {
  id: string
  activities: Activity[]
  createdAt: Dayjs
  expiresAt: Dayjs
  offer: Offer
  postedAt: Dayjs | undefined
  state: SwapState
}
