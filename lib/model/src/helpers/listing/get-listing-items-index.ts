import { getListingNftTokenItems } from '@echo/model/helpers/listing/get-listing-nft-token-items'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Item } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft'
import type { NftToken } from '@echo/model/types/token'
import type { Strict } from '@echo/utils/types/strict'
import { map, pipe, prop, uniq } from 'ramda'

export function getListingItemsIndex(listing: Pick<Listing, 'items'>): Strict<NftIndex, NftIndex>[] {
  return pipe<[Pick<Listing, 'items'>], Item<NftToken>[], Strict<NftIndex, NftIndex>[], Strict<NftIndex, NftIndex>[]>(
    getListingNftTokenItems,
    map(pipe(prop('token'), getNftIndex)),
    uniq
  )(listing)
}
