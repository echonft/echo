import { TokenType } from '@echo/model/constants/token-type'
import { type Collection, type CollectionContract, type CollectionIndex } from '@echo/model/types/collection'
import { type UserWithWallet } from '@echo/model/types/user'

export type NftCollection = Pick<Collection, 'contract' | 'name' | 'slug' | 'totalSupply'>

export interface NftAttribute {
  trait: string
  value: string
}

export interface Nft {
  attributes: NftAttribute[]
  collection: NftCollection
  name: string
  owner?: UserWithWallet
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

export interface OwnedNft extends Omit<Nft, 'owner'> {
  owner: UserWithWallet
}

export interface OwnedNftIndex extends NftIndex {
  owner: UserWithWallet
}

export interface Erc721Nft extends Omit<Nft, 'type'> {
  type: TokenType.Erc721
}

export interface OwnedErc721Nft extends Omit<OwnedNft, 'type'> {
  type: TokenType.Erc721
}

export interface Erc1155Nft extends Omit<Nft, 'type'> {
  type: TokenType.Erc1155
}

export interface OwnedErc1155Nft extends Omit<OwnedNft, 'type'> {
  type: TokenType.Erc1155
}
