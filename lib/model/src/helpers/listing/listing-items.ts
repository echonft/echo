import type { NftItem } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'
import { type NonEmptyArray, prop } from 'ramda'

export function listingItems(listing: Pick<Listing, 'items'>): NonEmptyArray<NftItem> {
  return prop('items', listing)
}
