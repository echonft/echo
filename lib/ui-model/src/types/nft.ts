import { NftAttribute } from './nft-attribute'
import { NftTokenType } from './nft-token-type'
import { User } from './user'
import { Wallet } from './wallet'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  blurUrl: URL | undefined
  collectionId: string
  collectionName: string
  name: string
  openSeaUrl: URL | undefined
  owner: User & { wallet: Wallet }
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: NftTokenType
}
