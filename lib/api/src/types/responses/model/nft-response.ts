import { NftCollectionResponse } from './nft-collection-response'
import { UserResponse } from './user-response'
import { NftTokenType } from '@echo/firestore-types'

export interface NftResponse {
  id: string
  attributes: {
    trait: string
    value: string
  }[]
  balance: number
  blurUrl?: string
  collection: Partial<NftCollectionResponse>
  name: string
  openSeaUrl?: string
  owner: Partial<UserResponse>
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: NftTokenType
}
