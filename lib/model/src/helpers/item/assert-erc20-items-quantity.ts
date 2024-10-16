import { ItemError } from '@echo/model/constants/errors/item-error'
import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import type { Erc20Item } from '@echo/model/types/item/erc20-item'
import type { Item } from '@echo/model/types/item/item'
import { any, complement, pipe } from 'ramda'
import { util } from 'zod'

function validQuantity(item: Erc20Item): boolean {
  const { quantity, token } = item
  const positive = quantity > 0
  if (token.decimals === 0) {
    return positive && util.isInteger(quantity)
  }
  return positive
}

export function assertErc20ItemsQuantity(items: (Erc20Item | Item)[]): Item[] {
  if (pipe<[(Erc20Item | Item)[]], Erc20Item[], boolean>(erc20Items, any(complement(validQuantity)))(items)) {
    throw Error(ItemError.Quantity)
  }
  return items
}
