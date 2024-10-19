import type { NftItem } from '@echo/model/types/item/nft-item'
import type { Listing } from '@echo/model/types/listing/listing'
import { type NonEmptyArray, prop } from 'ramda'

export function listingItems(listing: Listing): NonEmptyArray<NftItem> {
  return prop('items', listing)
}
