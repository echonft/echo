import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { User } from '@echo/ui/types/model/user'

export interface NewOffer {
  receiver: User
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
}
