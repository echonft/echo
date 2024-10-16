import { ItemError } from '@echo/model/constants/errors/item-error'
import { eqErc721Item } from '@echo/model/helpers/item/eq-erc721-item'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Item } from '@echo/model/types/item/item'
import { hasDuplicates } from '@echo/utils/fp/has-duplicates'
import { pipe } from 'ramda'

export function assertUniqErc721Items(items: (Erc721Item | Item)[]): Item[] {
  if (pipe(erc721Items, hasDuplicates(eqErc721Item))(items)) {
    throw Error(ItemError.Duplicates)
  }
  return items
}
