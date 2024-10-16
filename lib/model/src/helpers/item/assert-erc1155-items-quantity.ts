import { ItemError } from '@echo/model/constants/errors/item-error'
import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Item } from '@echo/model/types/item/item'
import { any, complement, pipe } from 'ramda'
import { util } from 'zod'

function validQuantity(item: Erc1155Item): boolean {
  const { quantity } = item
  return quantity > 0 && util.isInteger(quantity)
}

export function asserErc1155ItemsQuantity(items: (Erc1155Item | Item)[]): Item[] {
  if (pipe<[(Erc1155Item | Item)[]], Erc1155Item[], boolean>(erc1155Items, any(complement(validQuantity)))(items)) {
    throw Error(ItemError.Quantity)
  }
  return items
}
