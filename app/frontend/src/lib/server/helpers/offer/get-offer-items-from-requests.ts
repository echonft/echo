import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { getItemsFromRequests } from '@echo/frontend/lib/server/helpers/item/get-items-from-requests'
import { type OfferItem } from '@echo/model/types/offer-item'

export function getOfferItemsFromRequests(itemRequests: OfferItemRequest[]) {
  return getItemsFromRequests(itemRequests) as Promise<OfferItem[]>
}
