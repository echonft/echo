import { type Collection } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import type { NftIndex } from '@echo/model/types/nft-index'
import { type User } from '@echo/model/types/user'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Nft {
  animationUrl?: Nullable<string>
  attributes: NftAttribute[]
  collection: Collection
  metadataUrl?: Nullable<string>
  name: string
  owner: User
  pictureUrl?: Nullable<string>
  tokenId: number
  updatedAt: number
}

export type PartialNft = DeepPartial<Nft> & Required<NftIndex>
