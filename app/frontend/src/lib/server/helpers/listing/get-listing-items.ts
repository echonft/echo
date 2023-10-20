import { type ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getOfferItems } from '@server/helpers/offer/get-offer-items'

export function getListingItems(itemRequests: NonEmptyArray<ListingItemRequest>) {
  return getOfferItems(itemRequests) as Promise<Awaited<NonEmptyArray<ListingItem>>>
}
