import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import type { Listing } from '@echo/model/types/listing/listing'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, pipe, prop } from 'ramda'

export function addListingItemsIndex(modelObject: WithFieldValue<Listing>): WithFieldValue<Listing> {
  if (has('items', modelObject)) {
    return assoc('itemIndexes', pipe(prop('items'), itemsNftArrayIndexer)(modelObject), modelObject)
  }
  return modelObject
}
