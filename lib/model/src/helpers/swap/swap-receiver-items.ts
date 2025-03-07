import type { Item } from '@echo/model/types/item'
import type { Swap } from '@echo/model/types/swap'
import { type NonEmptyArray } from 'ramda'

export function swapReceiverItems(swap: Pick<Swap, 'receiverItems'>): NonEmptyArray<Item> {
  return swap.receiverItems
}
