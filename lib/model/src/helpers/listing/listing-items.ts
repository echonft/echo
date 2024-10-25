import type { NftItem } from '@echo/model/types/nft-item'
import type { Listing } from '@echo/model/types/listing'
import { type NonEmptyArray, prop } from 'ramda'

export function listingItems(listing: Listing): NonEmptyArray<NftItem> {
  return prop('items', listing)
}
