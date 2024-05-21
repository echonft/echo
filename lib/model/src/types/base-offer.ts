import { type OfferItem } from '@echo/model/types/offer-item'
import { type OfferState } from '@echo/model/types/offer-state'
import { type User } from '@echo/model/types/user'

export interface BaseOffer {
  expiresAt: number
  receiver: User
  receiverItems: OfferItem[]
  sender: User
  senderItems: OfferItem[]
  state: OfferState
}
