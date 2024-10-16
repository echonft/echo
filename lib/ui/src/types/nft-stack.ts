import type { NftCollection } from '@echo/model/types/nft/nft'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import type { User } from '@echo/model/types/user/user'
import type { NonEmptyArray } from 'ramda'

export interface NftStack {
  owner: User
  collection: NftCollection
  pictureUrl: string
  tokenId: string
  nfts: NonEmptyArray<Erc721Token | Erc1155Token>
}
