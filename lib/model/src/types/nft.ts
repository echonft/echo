import { TokenType } from '@echo/model/constants/token-type'
import { type Collection, type CollectionIndex } from '@echo/model/types/collection'
import { type User } from '@echo/model/types/user'

export type NftCollection = Pick<Collection, 'contract' | 'name' | 'slug' | 'totalSupply'>

export interface NftAttribute {
  trait: string
  value: string
}

export interface Nft {
  attributes: NftAttribute[]
  collection: NftCollection
  name: string
  owner?: User & Required<Pick<User, 'wallet'>>
  pictureUrl?: string
  tokenId: number
  type: TokenType.Erc721 | TokenType.Erc1155
}

export interface NftIndex extends Pick<Nft, 'tokenId'> {
  collection: CollectionIndex
}

export interface NftWithContract extends Omit<Nft, 'collection'> {
  collection: Partial<NftCollection> & Required<Pick<Collection, 'contract'>>
}

export type OwnedNft = Nft & Required<Pick<Nft, 'owner'>>

export interface OwnedNftIndex extends NftIndex {
  owner: User
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
