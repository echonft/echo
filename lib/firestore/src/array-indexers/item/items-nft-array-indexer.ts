import { itemNftArrayIndex } from '@echo/firestore/array-indexers/item/item-nft-array-index'
import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { NftItem } from '@echo/model/types/item'
import { map } from 'ramda'

export function itemsNftArrayIndexer(items: NftItem[]): ArrayIndexer {
  return map(itemNftArrayIndex, items)
}
