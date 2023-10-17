import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import { prop } from 'ramda'

export function getListingItems(listing: Listing): ListingItem[] {
  return prop('items', listing)
}
