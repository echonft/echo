import { type Collection } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { type User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Nft {
  attributes: NftAttribute[]
  // we only support ERC721 for now
  // balance: number
  blurUrl: Nullable<Lowercase<string>>
  collection: Collection
  name: string
  animationUrl?: Nullable<Lowercase<string>>
  metadataUrl?: Nullable<Lowercase<string>>
  openSeaUrl?: Nullable<Lowercase<string>>
  owner: User
  pictureUrl?: Nullable<Lowercase<string>>
  tokenId: number
  // we only support ERC721 for now
  // tokenType: NftTokenType
  updatedAt: number
}
