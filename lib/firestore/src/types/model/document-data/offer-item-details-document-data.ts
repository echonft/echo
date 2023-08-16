import { WalletDocumentData } from './wallet-document-data'

export interface OfferItemDetailsDocumentData {
  amount: number
  blurUrl?: string
  collectionName: string
  name: string
  openSeaUrl?: string
  ownerWallet: WalletDocumentData
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
}
