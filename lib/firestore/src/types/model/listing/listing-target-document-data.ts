import type { NftCollectionDocumentData } from '@echo/firestore/types/model/nft-collection/nft-collection-document-data'

export interface ListingTargetDocumentData {
  collection: NftCollectionDocumentData
  amount: number
}
