import { OfferItem } from './offer-item'
import { OfferState } from './offer-state'
import { User } from './user'
import { NonEmptyArray } from '@echo/utils'
import { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  createdAt: Dayjs
  expired: boolean
  expiresAt: Dayjs
  postedAt: Dayjs | undefined
  receiver: User
  receiverItems: NonEmptyArray<OfferItem>
  sender: User
  senderItems: NonEmptyArray<OfferItem>
  state: OfferState
}
