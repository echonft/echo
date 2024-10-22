import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import type { Listing } from '@echo/model/types/listing/listing'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, pipe } from 'ramda'

export function addListingItemsIndex(modelObject: WithFieldValue<Listing>): WithFieldValue<Listing> {
  if (has('items', modelObject)) {
    return assoc('itemIndexes', pipe(listingItems, itemsNftArrayIndexer)(modelObject as Listing), modelObject)
  }
  return modelObject
}
