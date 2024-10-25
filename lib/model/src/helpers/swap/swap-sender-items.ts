import type { Item } from '@echo/model/types/item'
import type { Swap } from '@echo/model/types/swap'
import { type NonEmptyArray } from 'ramda'

export function swapSenderItems(swap: Swap): NonEmptyArray<Item> {
  return swap.senderItems
}
