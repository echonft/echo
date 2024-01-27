import { type ItemRequest } from '@echo/api/types/requests/item-request'
import { getItemsFromRequests } from '@echo/frontend/lib/helpers/item/get-items-from-requests'
import { type ListingItem } from '@echo/model/types/listing-item'

export function getListingItemsFromRequests(itemRequests: ItemRequest[]) {
  return getItemsFromRequests(itemRequests) as Promise<ListingItem[]>
}
