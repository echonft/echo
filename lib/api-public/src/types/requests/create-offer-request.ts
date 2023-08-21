import { OfferItemRequest } from './offer-item-request'

export interface CreateOfferRequest {
  receiverDiscordId: string
  receiverItems: OfferItemRequest[]
  senderItems: OfferItemRequest[]
}
