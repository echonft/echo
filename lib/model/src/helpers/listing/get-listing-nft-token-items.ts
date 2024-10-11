import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { Item, Items } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'

import type { NftToken } from '@echo/model/types/token'
import { type NonEmptyArray, pipe, prop } from 'ramda'

export function getListingNftTokenItems(listing: Pick<Listing, 'items'>): NonEmptyArray<Item<NftToken>> {
  return pipe<[Pick<Listing, 'items'>], Items, NonEmptyArray<Item<NftToken>>>(prop('items'), nftItems)(listing)
}
