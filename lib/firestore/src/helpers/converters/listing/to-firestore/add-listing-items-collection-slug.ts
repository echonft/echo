import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import type { Listing } from '@echo/model/types/listing'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, pipe, uniq } from 'ramda'

export function addListingItemsCollectionSlug(modelObject: WithFieldValue<Listing>): WithFieldValue<Listing> {
  if (has('items', modelObject)) {
    return assoc(
      'itemCollections',
      pipe(listingItems, itemsCollectionArrayIndexer, uniq)(modelObject as Listing),
      modelObject
    )
  }
  return modelObject
}
