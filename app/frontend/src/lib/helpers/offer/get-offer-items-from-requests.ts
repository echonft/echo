import type { ItemRequest } from '@echo/api/types/requests/item-request'
import { getItemsFromRequests } from '@echo/frontend/lib/helpers/item/get-items-from-requests'
import { type OfferItem } from '@echo/model/types/offer-item'

export function getOfferItemsFromRequests(itemRequests: ItemRequest[]) {
  return getItemsFromRequests(itemRequests) as Promise<OfferItem[]>
}
