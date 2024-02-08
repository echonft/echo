import { type Collection } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { type NftTokenType } from '@echo/model/types/nft-token-type'
import { type User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  blurUrl?: Nullable<Lowercase<string>>
  collection: Collection
  name: string
  openSeaUrl?: Nullable<Lowercase<string>>
  owner: User
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: NftTokenType
  updatedAt: number
}
