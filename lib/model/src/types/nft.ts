import { type Collection, type CollectionContract, type CollectionIndex } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import type { Erc1155TokenType, Erc721TokenType, NftTokenType } from '@echo/model/types/token'
import { type User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import type { Strict } from '@echo/utils/types/strict'

export type NftCollection = Pick<Collection, 'contract' | 'name' | 'slug' | 'totalSupply'>

export interface Nft {
  animationUrl?: Nullable<string>
  attributes: NftAttribute[]
  collection: Strict<NftCollection, NftCollection>
  metadataUrl?: Nullable<string>
  name: string
  owner?: Nullable<User>
  pictureUrl?: Nullable<string>
  tokenId: number
  tokenIdLabel: string
  type: NftTokenType
}

export type Erc721Nft = Omit<Nft, 'type'> & Record<'type', Erc721TokenType>
export type Erc1155Nft = Omit<Nft, 'type'> & Record<'type', Erc1155TokenType>
export type NftIndex = Pick<Nft, 'tokenId'> & Record<'collection', CollectionIndex>
export type NftWithContract = Omit<NftIndex, 'collection'> & Record<'collection', CollectionContract>
export type OwnedNft = Omit<Nft, 'owner'> & Record<'owner', User>
export type OwnedNftIndex = NftIndex & Record<'owner', User>
