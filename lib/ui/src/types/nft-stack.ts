import type { NftCollection } from '@echo/model/types/nft'
import type { NftToken } from '@echo/model/types/token'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from 'ramda'

export interface NftStack {
  owner: User
  collection: NftCollection
  pictureUrl: string
  tokenId: string
  nfts: NonEmptyArray<NftToken>
}
