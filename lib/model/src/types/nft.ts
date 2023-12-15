import { type Collection } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { type NftTokenType } from '@echo/model/types/nft-token-type'
import { type User } from '@echo/model/types/user'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  blurUrl: string
  collection: Collection
  name: string
  openSeaUrl: string
  owner: User
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: NftTokenType
  updatedAt: number
}
