import { NonEmptyArray } from '../abstract/non-empty-array'
import { OfferItem } from './offer-item'
import { OfferState } from './offer-state'
import { UserDetails } from './user-details'
import { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  createdAt: Dayjs
  expiresAt: Dayjs
  postedAt: Dayjs | undefined
  receiver: UserDetails
  receiverItems: NonEmptyArray<OfferItem>
  sender: UserDetails
  senderItems: NonEmptyArray<OfferItem>
  state: OfferState
  threadId: string | undefined
}
