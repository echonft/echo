import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import type { Erc1155Item } from '@echo/model/types/erc1155-item'
import { eqPropsWith } from '@echo/utils/fp/eq-props-with'
import { and, eqProps, isNil } from 'ramda'

function internalFn(itemA: Erc1155Item): (itemB: Erc1155Item) => boolean {
  return function (itemB: Erc1155Item): boolean {
    return and(eqPropsWith('token', eqNft, itemA, itemB), eqProps('quantity', itemA, itemB))
  }
}
export function eqErc1155Item(itemA: Erc1155Item, itemB: Erc1155Item): boolean
export function eqErc1155Item(itemA: Erc1155Item): (itemB: Erc1155Item) => boolean
export function eqErc1155Item(itemA: Erc1155Item, itemB?: Erc1155Item): boolean | ((itemB: Erc1155Item) => boolean) {
  if (isNil(itemB)) {
    return internalFn(itemA)
  }
  return internalFn(itemA)(itemB)
}
