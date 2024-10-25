import { nftItemsIndex } from '@echo/model/helpers/item/nft-items-index'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export function listingItemsIndexes(listing: Listing): NftIndex[] {
  return pipe(listingItems, nftItemsIndex)(listing)
}
