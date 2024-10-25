import type { Item } from '@echo/model/types/item'
import type { Swap } from '@echo/model/types/swap'
import { type NonEmptyArray } from 'ramda'

export function swapSenderItems(swap: Pick<Swap, 'senderItems'>): NonEmptyArray<Item> {
  return swap.senderItems
}
