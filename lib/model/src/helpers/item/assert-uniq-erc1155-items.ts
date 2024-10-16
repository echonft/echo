import { ItemError } from '@echo/model/constants/errors/item-error'
import { eqErc1155Item } from '@echo/model/helpers/item/eq-erc1155-item'
import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Item } from '@echo/model/types/item/item'
import { hasDuplicates } from '@echo/utils/fp/has-duplicates'
import { pipe } from 'ramda'

export function assertUniqErc1155Items(items: (Erc1155Item | Item)[]): Item[] {
  if (pipe(erc1155Items, hasDuplicates(eqErc1155Item))(items)) {
    throw Error(ItemError.Duplicates)
  }
  return items
}
