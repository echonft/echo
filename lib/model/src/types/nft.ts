import { type Collection, type CollectionContract, type CollectionIndex } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { type User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'

export interface Nft {
  animationUrl?: Nullable<string>
  attributes: NftAttribute[]
  collection: Collection
  metadataUrl?: Nullable<string>
  name: string
  owner?: Nullable<User>
  pictureUrl?: Nullable<string>
  tokenId: number
}

export type NftIndex = Pick<Nft, 'tokenId'> & Record<'collection', CollectionIndex>
export type NftWithContract = Omit<NftIndex, 'collection'> & Record<'collection', CollectionContract>
export type OwnedNft = Omit<Nft, 'owner'> & Record<'owner', User>
export type OwnedNftIndex = NftIndex & Record<'owner', User>
