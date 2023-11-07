import { type ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { guarded_getItemsFromRequests } from '@echo/frontend/lib/server/helpers/item/guarded_get-items-from-requests'
import { type ListingItem } from '@echo/model/types/listing-item'

export function guarded_getListingItemsFromRequests(itemRequests: ListingItemRequest[]) {
  return guarded_getItemsFromRequests(itemRequests) as Promise<ListingItem[]>
}
