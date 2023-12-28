import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { NftStack } from '@echo/ui/types/nft-stack'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head, map, prop } from 'ramda'

export function getListingNftStack(listing: Listing): NftStack {
  const { items, creator } = listing
  if (items.length < 2) {
    throw Error('listing must have at least 2 items')
  }
  const nfts = map(prop('nft'), items) as NonEmptyArray<Nft>
  const { collection, pictureUrl, tokenId } = head(nfts)
  return {
    owner: creator,
    collection,
    pictureUrl,
    tokenId,
    nfts
  }
}
