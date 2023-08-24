import { OfferItemRequest } from './offer-item-request'
import { NonEmptyArray } from '@echo/utils'

export interface CreateOfferRequest {
  receiverId: string
  receiverItems: NonEmptyArray<OfferItemRequest>
  senderItems: NonEmptyArray<OfferItemRequest>
}
