import { NftCollection } from './nft-collection'
import { Token } from './token'

export interface Nft extends Token {
  id: string
  imageUri?: string
  name: string
  collection: NftCollection
}

export type Erc721 = Nft
