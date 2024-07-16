import { type Collection, type CollectionIndex } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { type PartialUser, type User } from '@echo/model/types/user'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { Nullable } from '@echo/utils/types/nullable'
import type { OptionalRecord } from '@echo/utils/types/optional-record'

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

export type NftIndex = Pick<Nft, 'tokenId'> & Record<'collection', CollectionIndex>
export type PartialNft = DeepPartial<Omit<Nft, 'owner'>> & Required<NftIndex> & OptionalRecord<'owner', PartialUser>
