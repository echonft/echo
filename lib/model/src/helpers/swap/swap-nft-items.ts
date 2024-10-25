import { nftItems } from '@echo/model/helpers/item/nft-items'
import { swapItems } from '@echo/model/helpers/swap/swap-items'
import type { NftItem } from '@echo/model/types/nft-item'
import type { Swap } from '@echo/model/types/swap'
import { type NonEmptyArray, pipe } from 'ramda'

export function swapNftItems(swap: Swap): NonEmptyArray<NftItem> {
  return pipe(swapItems, nftItems)(swap)
}
