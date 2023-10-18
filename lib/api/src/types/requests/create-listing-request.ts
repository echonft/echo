import { type ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface CreateListingRequest {
  items: NonEmptyArray<ListingItemRequest>
  target: ListingTargetRequest
}
