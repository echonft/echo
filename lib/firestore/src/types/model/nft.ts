import { NftAttribute } from './nft-attribute'
import { NftCollection } from './nft-collection'
import { NftTokenType } from './nft-token-type'
import { UserDetails } from './user-details'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number | undefined
  blurUrl: URL | undefined
  collection: NftCollection
  name: string
  openSeaUrl: URL | undefined
  owner: UserDetails
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: NftTokenType
}
