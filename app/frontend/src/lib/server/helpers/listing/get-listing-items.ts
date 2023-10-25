import { type ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { getOfferItems } from '@echo/frontend/lib/server/helpers/offer/get-offer-items'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getListingItems(itemRequests: NonEmptyArray<ListingItemRequest>) {
  return getOfferItems(itemRequests) as Promise<Awaited<NonEmptyArray<ListingItem>>>
}
