import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { Listing } from '@echo/model/types/listing/listing'
import { listingItems } from '@echo/model/types/listing/listing-items'
import type { NftIndex } from '@echo/model/types/nft/nft'
import { map, pipe, prop, uniq } from 'ramda'

export function listingItemsIndexes(listing: Listing): NftIndex[] {
  return pipe(listingItems, map(pipe(prop('token'), nftIndex)), uniq)(listing)
}
