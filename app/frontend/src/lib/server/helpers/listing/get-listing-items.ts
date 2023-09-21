import type { ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getOfferItems } from '@server/helpers/offer/get-offer-items'

export function getListingItems(itemRequests: NonEmptyArray<ListingItemRequest>) {
  return getOfferItems(itemRequests) as Promise<Awaited<NonEmptyArray<FirestoreListingItem>>>
}
