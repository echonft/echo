import { type ItemRequest } from '@echo/api/types/requests/item-request'
import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'

export interface CreateListingRequest {
  items: ItemRequest[]
  target: ListingTargetRequest
}
