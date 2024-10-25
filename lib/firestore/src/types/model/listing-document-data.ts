import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { Listing } from '@echo/model/types/listing'

export interface ListingDocumentData extends Listing {
  itemIndexes: ArrayIndexer
  itemCollections: ArrayIndexer
  signature: string
}
