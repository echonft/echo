import { listingItemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/listing-items-collection-array-indexer'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, pipe, prop } from 'ramda'

type ModelObject = WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>>
type WithItems = Omit<ModelObject, 'items'> & Pick<ListingDocumentData, 'items'>

function hasItems(modelObject: ModelObject): modelObject is WithItems {
  return has('items', modelObject)
}

export function addListingItemsCollectionSlug(modelObject: ModelObject): WithFieldValue<ListingDocumentData> {
  if (hasItems(modelObject)) {
    return assoc('itemCollections', pipe(prop('items'), listingItemsCollectionArrayIndexer)(modelObject), modelObject)
  }
  return assoc('itemCollections', [], modelObject)
}
