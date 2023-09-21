import type { OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface CreateOfferRequest {
  receiverItems: NonEmptyArray<OfferItemRequest>
  senderItems: NonEmptyArray<OfferItemRequest>
}
