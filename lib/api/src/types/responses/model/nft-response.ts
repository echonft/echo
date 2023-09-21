import type { CollectionResponse } from '@echo/api/types/responses/model/collection-response'
import type { UserDetailsResponse } from '@echo/api/types/responses/model/user-details-response'
import type { FirestoreNftTokenType } from '@echo/firestore/types/model/nft/firestore-nft-token-type'

export interface NftResponse {
  id: string
  attributes: {
    trait: string
    value: string
  }[]
  balance: number
  blurUrl?: string
  collection: Partial<CollectionResponse>
  name: string
  openSeaUrl?: string
  owner: Partial<UserDetailsResponse>
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: FirestoreNftTokenType
}
