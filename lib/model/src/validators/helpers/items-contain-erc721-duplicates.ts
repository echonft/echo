import { eqErc721Item } from '@echo/model/helpers/item/eq-erc721-item'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { AbstractItem } from '@echo/model/types/item'
import { listHasDuplicates } from '@echo/utils/helpers/list-has-duplicates'
import { pipe } from 'ramda'

export function itemsContainErc721Duplicates<T extends AbstractItem>(items: T[]): boolean {
  return pipe(erc721Items, listHasDuplicates(eqErc721Item))(items)
}
