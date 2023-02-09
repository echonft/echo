import { Offer } from './offer'
import { OfferItem } from './offer-item'
import { SwapActivity } from './swap-activity'
import { SwapState } from './swap-state'
import { User } from './user'
import { Dayjs } from 'dayjs'

// TODO Validate data here
export interface Swap {
  id: string
  state: SwapState
  sender: User
  senderItems: OfferItem[]
  receiver: User
  receiverItems: OfferItem[]
  offer: Offer
  activities: SwapActivity[]
  expiresAt: Dayjs
  createdAt: Dayjs
}
