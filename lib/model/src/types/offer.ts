import { type OfferItem } from '@echo/model/types/offer-item'
import { type OfferState } from '@echo/model/types/offer-state'
import { type User } from '@echo/model/types/user'

export interface Offer {
  id: string
  createdAt: number
  expired: boolean
  expiresAt: number
  receiver: User
  receiverItems: OfferItem[]
  sender: User
  senderItems: OfferItem[]
  state: OfferState
  updatedAt: number
}
