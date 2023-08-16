import { NftAttribute } from './nft-attribute'
import { Wallet } from './wallet'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number | undefined
  blurUrl: URL | undefined
  collectionId: string
  collectionName: string
  name: string
  openSeaUrl: URL | undefined
  ownerId: string
  ownerWallet: Wallet
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: 'ERC721' | 'ERC1155'
}
