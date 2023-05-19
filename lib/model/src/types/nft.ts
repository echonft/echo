import { NftCollection } from './nft-collection'
import { User } from './user'

export type NftTokenType = 'ERC721' | 'ERC1155' | 'UNKNOWN'

export interface NftAttribute {
  trait: string
  value: string
}

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
