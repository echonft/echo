import { listingItemNftArrayIndex } from '@echo/firestore/array-indexers/item/listing-item-nft-array-index'
import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { Listing } from '@echo/model/types/listing/listing'
import { map } from 'ramda'

export function listingItemsNftArrayIndexer(items: Listing['items']): ArrayIndexer {
  return map(listingItemNftArrayIndex, items)
}
