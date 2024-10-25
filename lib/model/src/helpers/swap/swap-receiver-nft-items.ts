import { nftItems } from '@echo/model/helpers/item/nft-items'
import { swapReceiverItems } from '@echo/model/helpers/swap/swap-receiver-items'
import type { NftItem } from '@echo/model/types/nft-item'
import type { Swap } from '@echo/model/types/swap'
import { type NonEmptyArray, pipe } from 'ramda'

export function swapReceiverNftItems(swap: Swap): NonEmptyArray<NftItem> {
  return pipe(swapReceiverItems, nftItems)(swap)
}
