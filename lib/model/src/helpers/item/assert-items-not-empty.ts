import { ItemError } from '@echo/model/constants/errors/item-error'
import type { Item } from '@echo/model/types/item/item'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { type NonEmptyArray } from 'ramda'

export function assertItemsNotEmpty(items: Item[]): NonEmptyArray<Item> {
  if (!isNonEmptyArray(items)) {
    throw Error(ItemError.Empty)
  }
  return items
}
