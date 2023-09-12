import type { NonEmptyArray } from '@echo/utils/types'
import type { ListingItemRequest } from '@echo-api/types/requests/listing-item-request'
import type { ListingTargetRequest } from '@echo-api/types/requests/listing-target-request'

export interface CreateListingRequest {
  items: NonEmptyArray<ListingItemRequest>
  targets: NonEmptyArray<ListingTargetRequest>
}
