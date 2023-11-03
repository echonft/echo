import { type ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { type ListingItem } from '@echo/model/types/listing-item'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'

export function mapListingItemsToRequests(items: ListingItem[]) {
  return mapItemsToRequests(items) as ListingItemRequest[]
}
