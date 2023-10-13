import type { ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function mapListingItemsToRequests(items: ListingItem[]) {
  return mapItemsToRequests(items) as NonEmptyArray<ListingItemRequest>
}
