import type { Listing } from '@echo/model/types/listing'
import type { NftItem } from '@echo/model/types/nft-item'
import { type NonEmptyArray, prop } from 'ramda'

export function listingItems(listing: Pick<Listing, 'items'>): NonEmptyArray<NftItem> {
  return prop('items', listing)
}
