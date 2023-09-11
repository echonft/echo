import { NftTokenType } from '@echo/firestore-types'
import type { NftCollectionResponse } from '@echo-api/types/responses/model/nft-collection-response'
import type { UserResponse } from '@echo-api/types/responses/model/user-response'

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
