import { itemCollectionArrayIndex } from '@echo/firestore/array-indexers/item/item-collection-array-index'
import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { NftItem } from '@echo/model/types/item'
import { map } from 'ramda'

export function itemsCollectionArrayIndexer(items: NftItem[]): ArrayIndexer {
  return map(itemCollectionArrayIndex, items)
}
