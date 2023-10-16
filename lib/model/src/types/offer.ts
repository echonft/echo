import type { OfferItem } from '@echo/model/types/offer-item'
import type { OfferState } from '@echo/model/types/offer-state'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface Offer {
  id: string
  createdAt: number
  expired: boolean
  expiresAt: number
  receiver: User
  receiverItems: NonEmptyArray<OfferItem>
  sender: User
  senderItems: NonEmptyArray<OfferItem>
  state: OfferState
  updatedAt: number
}
