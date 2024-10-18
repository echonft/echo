import { listingItemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/listing-items-nft-array-indexer'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, pipe, prop } from 'ramda'

type ModelObject = WithFieldValue<Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>>
type WithItems = Omit<ModelObject, 'items'> & Pick<ListingDocumentData, 'items'>

function hasItems(modelObject: ModelObject): modelObject is WithItems {
  return has('items', modelObject)
}

export function addListingItemsIndex(
  modelObject: ModelObject
): WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>> {
  if (hasItems(modelObject)) {
    return assoc('itemIndexes', pipe(prop('items'), listingItemsNftArrayIndexer)(modelObject), modelObject)
  }
  return assoc('itemIndexes', [], modelObject)
}
