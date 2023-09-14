import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'

export interface OfferItemDocumentData {
  amount: number
  nft: NftDocumentData
}
