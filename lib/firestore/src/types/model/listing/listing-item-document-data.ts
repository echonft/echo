import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'

export interface ListingItemDocumentData {
  amount: number
  nft: NftDocumentData
}
