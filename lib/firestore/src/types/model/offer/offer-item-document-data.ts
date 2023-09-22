import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'

export interface OfferItemDocumentData {
  amount: number
  nft: NftDocumentData
}
