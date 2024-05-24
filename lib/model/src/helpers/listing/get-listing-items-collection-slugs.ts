import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import type { Listing } from '@echo/model/types/listing'
import type { Slug } from '@echo/model/types/slug'
import { pipe, prop } from 'ramda'

export function getListingItemsCollectionSlugs<T extends Pick<Listing, 'items'>>(listing: T): Slug[] {
  return pipe(prop('items'), getNftsCollectionSlugs)(listing)
}
