import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { OfferState } from '@echo/ui/types/model/offer-state'
import type { User } from '@echo/ui/types/model/user'
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
