import { TokenType } from '@echo/model/constants/token-type'
import { type Collection, type CollectionContract, type CollectionIndex } from '@echo/model/types/collection/collection'
import { type NftAttribute } from '@echo/model/types/nft/nft-attribute'
import { type User } from '@echo/model/types/user/user'
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
  type: TokenType.Erc721 | TokenType.Erc1155
}

export interface NftIndex extends Pick<Nft, 'tokenId'> {
  collection: CollectionIndex
}

export interface NftWithContract extends Omit<NftIndex, 'collection'> {
  collection: CollectionContract
}
