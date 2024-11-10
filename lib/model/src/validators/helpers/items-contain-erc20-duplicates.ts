import { eqErc20Item } from '@echo/model/helpers/item/eq-erc20-item'
import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import type { AbstractItem } from '@echo/model/types/item'
import { listHasDuplicates } from '@echo/utils/helpers/list-has-duplicates'
import { pipe } from 'ramda'

export function itemsContainErc20Duplicates<T extends AbstractItem>(items: T[]): boolean {
  return pipe(erc20Items, listHasDuplicates(eqErc20Item))(items)
}
