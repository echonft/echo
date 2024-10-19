import type { ArrayIndexer } from '@echo/firestore/types/array-indexer'
import type { Erc1155ItemDocumentData } from '@echo/firestore/types/model/erc1155-item-document-data'
import type { Erc721ItemDocumentData } from '@echo/firestore/types/model/erc721-token-document-data'
import type { Offer } from '@echo/model/types/offer/offer'
import type { NonEmptyArray } from 'ramda'

export interface OfferDocumentData extends Omit<Offer, 'receiverItems' | 'senderItems'> {
  receiverItems: NonEmptyArray<Erc721ItemDocumentData | Erc1155ItemDocumentData>
  receiverItemIndexes: ArrayIndexer
  receiverItemCollections: ArrayIndexer
  senderItems: NonEmptyArray<Erc721ItemDocumentData | Erc1155ItemDocumentData>
  senderItemIndexes: ArrayIndexer
  senderItemCollections: ArrayIndexer
}
