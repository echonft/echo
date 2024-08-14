import type { Nft, NftCollection, OwnedNft } from '@echo/model/types/nft'
import type { NonEmptyArray } from 'ramda'

export interface NftStack {
  owner: OwnedNft['owner']
  collection: NftCollection
  pictureUrl: string
  tokenId: string
  nfts: NonEmptyArray<Nft>
}
