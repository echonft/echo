import type { NftCollection } from '@echo/model/types/nft/nft'
import type { NftToken } from '@echo/model/types/token/nft-token'
import type { User } from '@echo/model/types/user/user'
import type { NonEmptyArray } from 'ramda'

export interface NftStack {
  owner: User
  collection: NftCollection
  pictureUrl: string
  tokenIdLabel: string
  nfts: NonEmptyArray<NftToken>
}
