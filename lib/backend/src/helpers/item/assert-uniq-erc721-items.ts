import { ItemError } from '@echo/model/constants/errors/item-error'
import { eqErc721Item } from '@echo/model/helpers/item/eq-erc721-item'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { AbstractItem } from '@echo/model/types/abstract-item'
import { listHasDuplicates } from '@echo/utils/fp/list-has-duplicates'
import { pipe } from 'ramda'

export function assertUniqErc721Items<T extends AbstractItem>(items: T[]): T[] {
  if (pipe(erc721Items, listHasDuplicates(eqErc721Item))(items)) {
    throw Error(ItemError.Duplicates)
  }
  return items
}
