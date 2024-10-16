import type { Listing } from '@echo/model/types/listing/listing'
import { prop } from 'ramda'

export function listingItems(listing: Listing): Listing['items'] {
  return prop('items', listing)
}
