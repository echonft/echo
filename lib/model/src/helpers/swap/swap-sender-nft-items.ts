import { nftItems } from '@echo/model/helpers/item/nft-items'
import { swapSenderItems } from '@echo/model/helpers/swap/swap-sender-items'
import type { NftItem } from '@echo/model/types/nft-item'
import type { Swap } from '@echo/model/types/swap'
import { type NonEmptyArray, pipe } from 'ramda'

export function swapSenderNftItems(swap: Swap): NonEmptyArray<NftItem> {
  return pipe(swapSenderItems, nftItems)(swap)
}
