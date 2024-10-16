import { getNftCollectionSlug } from '@echo/model/helpers/nft/get-nft-collection-slug'
import type { Listing } from '@echo/model/types/listing/listing'
import { listingItems } from '@echo/model/types/listing/listing-items'
import type { Slug } from '@echo/model/types/slug'
import { map, pipe, prop, uniq } from 'ramda'

export function listingItemsCollectionSlugs(listing: Listing): Slug[] {
  return pipe(listingItems, map(pipe(prop('token'), getNftCollectionSlug)), uniq)(listing)
}
