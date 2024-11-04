import { ItemError } from '@echo/model/constants/errors/item-error'
import { eqErc1155Item } from '@echo/model/helpers/item/eq-erc1155-item'
import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import type { AbstractItem } from '@echo/model/types/item'
import { listHasDuplicates } from '@echo/utils/helpers/list-has-duplicates'
import { pipe } from 'ramda'

export function assertUniqErc1155Items<T extends AbstractItem>(items: T[]) {
  if (pipe(erc1155Items, listHasDuplicates(eqErc1155Item))(items)) {
    throw Error(ItemError.Duplicates)
  }
}
