import { OfferItem } from './offer-item'
import { User } from './user'

export interface NewOffer {
  receiver: User
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
}
