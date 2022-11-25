import { NftCollection } from './nft-collection'

export enum TokenType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155'
}

export interface Token {
  key: string
  type: TokenType
}

export interface Nft extends Token {
  id: string
  imageUri?: string
  name: string
  collection: NftCollection
}

export type Erc721 = Nft
