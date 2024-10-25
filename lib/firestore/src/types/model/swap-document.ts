import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { Swap } from '@echo/model/types/swap'

export interface SwapDocument extends Swap {
  offerId: string
  receiverItemIndexes: ArrayIndexer
  receiverItemCollections: ArrayIndexer
  senderItemIndexes: ArrayIndexer
  senderItemCollections: ArrayIndexer
}
