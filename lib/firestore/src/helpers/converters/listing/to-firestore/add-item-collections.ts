import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>>
type WithItems = Omit<ModelObject, 'items'> & {
  items: Nft[]
}

function hasItems(modelObject: ModelObject): modelObject is WithItems {
  return has('items', modelObject)
}

export function addItemCollections(modelObject: ModelObject): WithFieldValue<ListingDocumentData> {
  if (hasItems(modelObject)) {
    return assoc('itemCollections', getNftsCollectionSlugs(modelObject.items), modelObject)
  }
  return assoc('itemCollections', [], modelObject)
}
