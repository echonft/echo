import { ItemError } from '@echo/model/constants/errors/item-error'
import { eqErc20Item } from '@echo/model/helpers/item/eq-erc20-item'
import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import type { Erc20Item } from '@echo/model/types/item/erc20-item'
import type { Item } from '@echo/model/types/item/item'
import { hasDuplicates } from '@echo/utils/fp/has-duplicates'
import { pipe } from 'ramda'

export function assertUniqErc20Items(items: (Erc20Item | Item)[]): Item[] {
  if (pipe(erc20Items, hasDuplicates(eqErc20Item))(items)) {
    throw Error(ItemError.Duplicates)
  }
  return items
}
