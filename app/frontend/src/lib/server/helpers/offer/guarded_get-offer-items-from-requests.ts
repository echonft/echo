import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { guarded_getItemsFromRequests } from '@echo/frontend/lib/server/helpers/item/guarded_get-items-from-requests'
import { type OfferItem } from '@echo/model/types/offer-item'

export function guarded_getOfferItemsFromRequests(itemRequests: OfferItemRequest[]) {
  return guarded_getItemsFromRequests(itemRequests) as Promise<OfferItem[]>
}
