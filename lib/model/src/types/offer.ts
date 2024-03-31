import { type OfferItem } from '@echo/model/types/offer-item'
import { type OfferState } from '@echo/model/types/offer-state'
import { type User } from '@echo/model/types/user'
import type { WithId } from '@echo/model/types/with-id'

export interface Offer extends WithId {
  id: string
  createdAt: number
  expiresAt: number
  readOnly: boolean
  receiver: User
  receiverItems: OfferItem[]
  sender: User
  senderItems: OfferItem[]
  state: OfferState
  updatedAt: number
}
