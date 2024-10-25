import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { Offer } from '@echo/model/types/offer'

export interface OfferDocument extends Offer {
  receiverItemIndexes: ArrayIndexer
  receiverItemCollections: ArrayIndexer
  senderItemIndexes: ArrayIndexer
  senderItemCollections: ArrayIndexer
}
