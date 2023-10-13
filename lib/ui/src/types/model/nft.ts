import type { Collection } from '@echo/ui/types/model/collection'
import type { NftAttribute } from '@echo/ui/types/model/nft-attribute'
import type { NftTokenType } from '@echo/ui/types/model/nft-token-type'
import type { User } from '@echo/ui/types/model/user'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  blurUrl?: string
  collection: Collection
  name: string
  openSeaUrl?: string
  owner: User
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: NftTokenType
  updatedAt: number
}
