import { Id } from './id'
import { NftAttribute } from './nft-attribute'
import { NftCollection } from './nft-collection'
import { NftTokenType } from './nft-token-type'
import { UserDetails } from './user-details'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  blurUrl?: URL
  collection: Partial<NftCollection> & Id
  name: string
  openSeaUrl?: URL
  owner: Partial<UserDetails> & Id
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: NftTokenType
}
