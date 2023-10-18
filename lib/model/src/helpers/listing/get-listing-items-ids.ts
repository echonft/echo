import { getItemId } from '@echo/model/helpers/item/get-item-id'
import { getListingItems } from '@echo/model/helpers/listing/get-listing-items'
import { type Listing } from '@echo/model/types/listing'
import { map, pipe, uniq } from 'ramda'

export function getListingItemsIds(listing: Listing) {
  return pipe(getListingItems, map(getItemId), uniq)(listing)
}
