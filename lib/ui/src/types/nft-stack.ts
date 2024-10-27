import type { NftCollection } from '@echo/model/types/nft'
import type { NftToken } from '@echo/model/types/nft-token'
import type { UserWithWallet } from '@echo/model/types/user'
import type { NonEmptyArray } from 'ramda'

export interface NftStack {
  owner: UserWithWallet
  collection: NftCollection
  pictureUrl: string
  label: string
  nfts: NonEmptyArray<NftToken>
}
