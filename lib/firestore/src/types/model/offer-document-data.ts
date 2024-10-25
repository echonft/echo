import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { Offer } from '@echo/model/types/offer'

export interface OfferDocumentData extends Offer {
  receiverItemIndexes: ArrayIndexer
  receiverItemCollections: ArrayIndexer
  senderItemIndexes: ArrayIndexer
  senderItemCollections: ArrayIndexer
}
