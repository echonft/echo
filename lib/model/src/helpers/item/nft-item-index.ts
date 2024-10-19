import { itemToken } from '@echo/model/helpers/item/item-token'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { NftIndex } from '@echo/model/types/nft/nft'
import { pipe } from 'ramda'

export function nftItemIndex(item: NftItem): NftIndex {
  return pipe(itemToken, nftIndex)(item)
}
