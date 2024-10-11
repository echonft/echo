import { getItemsIndexes } from '@echo/firestore/helpers/item/get-items-indexes'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
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
    return assoc('itemIndexes', pipe(prop('items'), getItemsIndexes)(modelObject), modelObject)
  }
  return assoc('itemIndexes', [], modelObject)
}
