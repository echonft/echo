import type { Collection } from '@echo/ui/types/model/collection'
import type { NftAttribute } from '@echo/ui/types/model/nft-attribute'
import type { NftTokenType } from '@echo/ui/types/model/nft-token-type'
import type { UserDetails } from '@echo/ui/types/model/user-details'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  blurUrl?: URL
  collection: Collection
  name: string
  openSeaUrl?: URL
  owner: UserDetails
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: NftTokenType
}
