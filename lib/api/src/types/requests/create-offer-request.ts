import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'

export interface CreateOfferRequest {
  receiverItems: OfferItemRequest[]
  senderItems: OfferItemRequest[]
}
