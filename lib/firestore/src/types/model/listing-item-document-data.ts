import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'

export interface ListingItemDocumentData {
  amount: number
  nft: NftDocumentData
}
