import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import { eqPropsWith } from '@echo/utils/fp/eq-props-with'
import { isNil } from 'ramda'

function internalFn(itemA: Erc721Item): (itemB: Erc721Item) => boolean {
  return function (itemB: Erc721Item): boolean {
    return eqPropsWith('token', eqNft, itemA, itemB)
  }
}
export function eqErc721Item(itemA: Erc721Item, itemB: Erc721Item): boolean
export function eqErc721Item(itemA: Erc721Item): (itemB: Erc721Item) => boolean
export function eqErc721Item(itemA: Erc721Item, itemB?: Erc721Item): boolean | ((itemB: Erc721Item) => boolean) {
  if (isNil(itemB)) {
    return internalFn(itemA)
  }
  return internalFn(itemA)(itemB)
}
