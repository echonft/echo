import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import type { Listing } from '@echo/model/types/listing/listing'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, pipe, prop, uniq } from 'ramda'

export function addListingItemsCollectionSlug(modelObject: WithFieldValue<Listing>): WithFieldValue<Listing> {
  if (has('items', modelObject)) {
    return assoc('itemCollections', pipe(prop('items'), itemsCollectionArrayIndexer, uniq)(modelObject), modelObject)
  }
  return modelObject
}
