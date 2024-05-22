import { itemComparator } from '@echo/firestore/helpers/item/item-comparator'
import type { Nft } from '@echo/model/types/nft'
import { differenceWith, isEmpty, length, pipe } from 'ramda'

export function itemsEq(itemsA: Nft[], itemsB: Nft[]): boolean {
  const itemsALength = length(itemsA)
  if (itemsALength !== length(itemsB)) {
    return false
  }
  return pipe(differenceWith<Nft, Nft>, isEmpty)(itemComparator, itemsA, itemsB)
}
