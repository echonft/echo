import { ListingTargetRequest } from './listing-target-request'
import { OfferItemRequest } from './offer-item-request'
import { NonEmptyArray } from '@echo/utils'

export interface CreateListingRequest {
  items: NonEmptyArray<OfferItemRequest>
  targets: NonEmptyArray<ListingTargetRequest>
}
