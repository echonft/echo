import { Activity } from './activity'
import { OfferItem } from './offer-item'
import { OfferState } from './offer-state'
import { UserDetails } from './user-details'
import { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  activities: Activity[]
  createdAt: Dayjs
  expiresAt: Dayjs
  postedAt: Dayjs | undefined
  receiver: UserDetails
  receiverItems: OfferItem[]
  sender: UserDetails
  senderItems: OfferItem[]
  state: OfferState
  threadId: string | undefined
}
