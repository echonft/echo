import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft'
import type { Strict } from '@echo/utils/types/strict'
import { map, pipe, prop } from 'ramda'

export function getListingItemsIndexes<T extends Pick<Listing, 'items'>>(listing: T): Strict<NftIndex, NftIndex>[] {
  return pipe(prop('items'), map(getNftIndex))(listing)
}
