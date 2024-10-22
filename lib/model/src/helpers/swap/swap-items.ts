import { swapReceiverNftItems } from '@echo/model/helpers/swap/swap-receiver-nft-items'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import type { Item } from '@echo/model/types/item/item'
import type { Swap } from '@echo/model/types/swap/swap'
import { concat, converge, type NonEmptyArray } from 'ramda'

export function swapItems(swap: Swap): NonEmptyArray<Item> {
  return converge(concat, [swapReceiverNftItems, swapSenderNftItems])(swap)
}
