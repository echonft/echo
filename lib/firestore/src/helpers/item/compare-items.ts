import { itemComparator } from '@echo/firestore/helpers/item/item-comparator'
import type { Nft } from '@echo/model/types/nft'
import { concat, equals, length, pipe, uniqWith } from 'ramda'

export function compareItems(itemsA: Nft[], itemsB: Nft[]): boolean {
  const itemsALength = length(itemsA)
  if (itemsALength !== length(itemsB)) {
    return false
  }
  return pipe(concat, uniqWith(itemComparator), length, equals(itemsALength))(itemsA, itemsB)
}
