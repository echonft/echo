import type { NonEmptyArray } from '@echo/utils'
import type { OfferItemRequest } from '@echo-api/types/requests/offer-item-request'

export interface CreateOfferRequest {
  receiverId: string
  receiverItems: NonEmptyArray<OfferItemRequest>
  senderItems: NonEmptyArray<OfferItemRequest>
}
