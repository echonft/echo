import { getListingNftTokenItems } from '@echo/model/helpers/listing/get-listing-nft-token-items'
import { getNftCollectionSlug } from '@echo/model/helpers/nft/get-nft-collection-slug'
import type { Item } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'
import type { Slug } from '@echo/model/types/slug'
import type { NftToken } from '@echo/model/types/token'
import { map, pipe, prop, uniq } from 'ramda'

export function getListingItemsCollectionSlug(listing: Pick<Listing, 'items'>): Slug[] {
  return pipe<[Pick<Listing, 'items'>], Item<NftToken>[], Slug[], Slug[]>(
    getListingNftTokenItems,
    map(pipe(prop('token'), getNftCollectionSlug)),
    uniq
  )(listing)
}
