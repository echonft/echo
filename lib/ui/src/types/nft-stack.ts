import type { NftCollection, NftOwner } from '@echo/model/types/nft'
import type { NftToken } from '@echo/model/types/nft-token'
import type { NonEmptyArray } from 'ramda'

export interface NftStack {
  owner: NftOwner
  collection: NftCollection
  pictureUrl: string
  label: string
  nfts: NonEmptyArray<NftToken>
}
