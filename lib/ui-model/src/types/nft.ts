import { NftAttribute } from './nft-attribute'
import { NftCollection } from './nft-collection'
import { NftTokenType } from './nft-token-type'
import { User } from './user'
import { Wallet } from './wallet'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  blurUrl: URL | undefined
  collection: NftCollection
  name: string
  openSeaUrl: URL | undefined
  owner: User & { wallet: Wallet }
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: NftTokenType
}
