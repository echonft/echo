import { OfferItem } from './offer-item'
import { OfferState } from './offer-state'
import { User } from './user'
import { Wallet } from './wallet'
import { NonEmptyArray } from '@echo/utils'
import { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  createdAt: Dayjs
  expired: boolean
  expiresAt: Dayjs
  receiver: User & { wallet: Wallet }
  receiverItems: NonEmptyArray<OfferItem>
  sender: User & { wallet: Wallet }
  senderItems: NonEmptyArray<OfferItem>
  state: OfferState
  swapTransactionId?: string
}
