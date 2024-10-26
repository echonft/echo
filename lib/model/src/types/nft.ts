import { TokenType } from '@echo/model/constants/token-type'
import type { Address } from '@echo/model/types/address'
import { type Collection, type CollectionContract, type CollectionIndex } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { type User } from '@echo/model/types/user'

export type NftCollection = Pick<Collection, 'contract' | 'name' | 'slug' | 'totalSupply'>
export type NftOwner = User & Record<'wallet', Address>

export interface Nft {
  attributes: NftAttribute[]
  collection: NftCollection
  name: string
  owner?: NftOwner
  pictureUrl?: string
  tokenId: number
  type: TokenType.Erc721 | TokenType.Erc1155
}

export interface NftIndex extends Pick<Nft, 'tokenId'> {
  collection: CollectionIndex
}

export interface NftWithContract extends Omit<NftIndex, 'collection'> {
  collection: CollectionContract
}
