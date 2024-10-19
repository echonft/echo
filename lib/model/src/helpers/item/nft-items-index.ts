import { nftItemIndex } from '@echo/model/helpers/item/nft-item-index'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { NftIndex } from '@echo/model/types/nft/nft'
import { map, pipe, uniq } from 'ramda'

export function nftItemsIndex(item: NftItem[]): NftIndex[] {
  return pipe(map(nftItemIndex), uniq)(item)
}
