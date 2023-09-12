import { OfferItem } from './offer-item'
import { OfferState } from './offer-state'
import { User } from './user'
import { NonEmptyArray } from '@echo/utils/types'
import { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  createdAt: Dayjs
  expired: boolean
  expiresAt: Dayjs
  receiver: User
  receiverItems: NonEmptyArray<OfferItem>
  sender: User
  senderItems: NonEmptyArray<OfferItem>
  state: OfferState
  swapTransactionId?: string
}
