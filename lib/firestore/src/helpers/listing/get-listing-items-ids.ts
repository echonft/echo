import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import { map, path, pipe, prop, uniq } from 'ramda'

export function getListingItemsIds(listing: Partial<Listing> & Record<'items', ListingItem[]>) {
  return pipe(prop('items'), map(path(['nft', 'id'])), uniq)(listing) as string[]
}
