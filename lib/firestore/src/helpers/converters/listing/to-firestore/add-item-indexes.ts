import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { getListingItemsIndexes } from '@echo/model/helpers/listing/get-listing-items-indexes'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>>
type WithItems = Omit<ModelObject, 'items'> & Pick<ListingDocumentData, 'items'>

function hasItems(modelObject: ModelObject): modelObject is WithItems {
  return has('items', modelObject)
}

export function addItemIndexes(modelObject: ModelObject): WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>> {
  if (hasItems(modelObject)) {
    return assoc('itemIndexes', getListingItemsIndexes(modelObject), modelObject)
  }
  return assoc('itemIndexes', [], modelObject)
}
