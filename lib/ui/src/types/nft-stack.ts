import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'

export interface NftStack {
  owner: User
  collection: Collection
  pictureUrl: string
  tokenId: number
  nfts: Nft[]
}
