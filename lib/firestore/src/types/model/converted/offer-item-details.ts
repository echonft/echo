import { Wallet } from './wallet'

export interface OfferItemDetails {
  amount: number
  blurUrl: URL | undefined
  collectionName: string
  name: string
  openSeaUrl: URL | undefined
  ownerWallet: Wallet
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
}
