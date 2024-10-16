import { getListingItemsCollectionSlugs } from '@echo/firestore/helpers/listing/get-listing-items-collection-slugs'
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
    return assoc('itemCollections', pipe(prop('items'), getListingItemsCollectionSlugs)(modelObject), modelObject)
  }
  return assoc('itemCollections', [], modelObject)
}
