import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { Listing } from '@echo/model/types/listing'
import { dissoc, pipe } from 'ramda'

export function listingDocumentToModel(document: ListingDocument): Listing {
  return pipe(dissoc('itemIndexes'), dissoc('itemCollections'), dissoc('signature'))(document)
}
