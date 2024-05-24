import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft-index'
import { map, pipe, prop } from 'ramda'

export function getListingItemsIndexes<T extends Pick<Listing, 'items'>>(listing: T): NftIndex[] {
  return pipe(prop('items'), map(getNftIndex))(listing)
}
