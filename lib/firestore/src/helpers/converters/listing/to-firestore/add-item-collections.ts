import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { getListingItemsCollectionSlugs } from '@echo/model/helpers/listing/get-listing-items-collection-slugs'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>>
type WithItems = Omit<ModelObject, 'items'> & Pick<ListingDocumentData, 'items'>

function hasItems(modelObject: ModelObject): modelObject is WithItems {
  return has('items', modelObject)
}

export function addItemCollections(modelObject: ModelObject): WithFieldValue<ListingDocumentData> {
  if (hasItems(modelObject)) {
    return assoc('itemCollections', getListingItemsCollectionSlugs(modelObject), modelObject)
  }
  return assoc('itemCollections', [], modelObject)
}
