import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import type { AbstractItem } from '@echo/model/types/item'
import { equals, length, pipe } from 'ramda'

export function itemsContainOnlyErc20Items<T extends AbstractItem>(items: T[]): boolean {
  return pipe(erc20Items, length, equals(items.length))(items)
}
