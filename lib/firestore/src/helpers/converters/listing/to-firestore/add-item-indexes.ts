import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { mapNftsToNftIndexes } from '@echo/model/helpers/nft/map-nfts-to-nft-indexes'
import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>>
type WithItems = Omit<ModelObject, 'items'> & {
  items: Nft[]
}

function hasItems(modelObject: ModelObject): modelObject is WithItems {
  return has('items', modelObject)
}

export function addItemIndexes(modelObject: ModelObject): WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>> {
  if (hasItems(modelObject)) {
    return assoc('itemIndexes', mapNftsToNftIndexes(modelObject.items), modelObject)
  }
  return assoc('itemIndexes', [], modelObject)
}
