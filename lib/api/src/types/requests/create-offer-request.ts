import type { OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface CreateOfferRequest {
  receiverId: string
  receiverItems: NonEmptyArray<OfferItemRequest>
  senderItems: NonEmptyArray<OfferItemRequest>
}
