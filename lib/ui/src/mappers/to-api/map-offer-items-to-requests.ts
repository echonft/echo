import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { type OfferItem } from '@echo/model/types/offer-item'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'

export function mapOfferItemsToRequests(items: OfferItem[]) {
  return mapItemsToRequests(items) as OfferItemRequest[]
}
