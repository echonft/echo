import { listingItemCollectionArrayIndex } from '@echo/firestore/array-indexers/item/listing-item-collection-array-index'
import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { Listing } from '@echo/model/types/listing/listing'
import { map } from 'ramda'

export function listingItemsCollectionArrayIndexer(items: Listing['items']): ArrayIndexer {
  return map(listingItemCollectionArrayIndex, items)
}
