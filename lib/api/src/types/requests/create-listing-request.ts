import { ListingItemRequest } from './listing-item-request'
import { ListingTargetRequest } from './listing-target-request'
import { NonEmptyArray } from '@echo/utils'

export interface CreateListingRequest {
  items: NonEmptyArray<ListingItemRequest>
  targets: NonEmptyArray<ListingTargetRequest>
}
