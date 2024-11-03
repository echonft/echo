import { eqErc20Token } from '@echo/model/helpers/token/eq-erc20-token'
import type { Erc20Item } from '@echo/model/types/item'
import { eqPropsWith } from '@echo/utils/helpers/eq-props-with'
import { and, eqProps, isNil } from 'ramda'

function innerEqErc20Item(itemA: Erc20Item): (itemB: Erc20Item) => boolean {
  return function (itemB: Erc20Item): boolean {
    return and(eqPropsWith('token', eqErc20Token, itemA, itemB), eqProps('quantity', itemA, itemB))
  }
}
export function eqErc20Item(itemA: Erc20Item, itemB: Erc20Item): boolean
export function eqErc20Item(itemA: Erc20Item): (itemB: Erc20Item) => boolean
export function eqErc20Item(itemA: Erc20Item, itemB?: Erc20Item): boolean | ((itemB: Erc20Item) => boolean) {
  if (isNil(itemB)) {
    return innerEqErc20Item(itemA)
  }
  return innerEqErc20Item(itemA)(itemB)
}
