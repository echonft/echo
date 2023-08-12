import { NftAttribute } from './nft-attribute'
import { NftCollection } from './nft-collection'
import { NftTokenType } from './nft-token-type'
import { User } from './user'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  collection: NftCollection
  description: string | undefined
  name: string | undefined
  owner: User
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: NftTokenType
}
