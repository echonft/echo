import { NftCollectionResponse } from './nft-collection-response'
import { NftTokenType } from './nft-token-type'
import { UserResponse } from './user-response'

export interface NftResponse {
  id: string
  attributes: {
    trait: string
    value: string
  }[]
  balance: number
  blurUrl?: string
  collection: NftCollectionResponse | Pick<NftCollectionResponse, 'id'>
  name: string
  openSeaUrl?: string
  owner: UserResponse
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: NftTokenType
}
