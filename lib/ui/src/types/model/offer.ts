import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { OfferState } from '@echo/ui/types/model/offer-state'
import type { UserDetails } from '@echo/ui/types/model/user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  createdAt: Dayjs
  expired: boolean
  expiresAt: Dayjs
  receiver: UserDetails
  receiverItems: NonEmptyArray<OfferItem>
  sender: UserDetails
  senderItems: NonEmptyArray<OfferItem>
  state: OfferState
}
