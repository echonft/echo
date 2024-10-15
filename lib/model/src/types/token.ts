import type { Nft, NftCollection, NftIndex } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import type { Strict } from '@echo/utils/types/strict'

export type Erc20TokenType = 'erc20'
export type Erc721TokenType = 'erc721'
export type Erc1155TokenType = 'erc1155'
export type NftTokenType = Erc721TokenType | Erc1155TokenType
export type TokenType = NftTokenType | Erc20TokenType

export interface Token {
  contract: Wallet
  name: string
  type: TokenType
}

export interface Erc20Token extends Token {
  decimals: number
  type: Erc20TokenType
}

export interface Erc20TokenBalance {
  token: Erc20Token
  balance: number
}

export interface NftToken extends Token, Omit<Nft, 'attributes' | 'collection' | 'owner'> {
  collection: Strict<Omit<NftCollection, 'contract'>, Omit<NftCollection, 'contract'>>
  type: Erc721TokenType | Erc1155TokenType
}

export interface Erc721Token extends NftToken {
  type: Erc721TokenType
}

export interface Erc1155Token extends NftToken {
  type: Erc1155TokenType
}

export type Erc20TokenIndex = Pick<Erc20Token, 'contract' | 'type'>
export type Erc721TokenIndex = NftIndex & Pick<Erc721Token, 'type'>
export type Erc1155TokenIndex = NftIndex & Pick<Erc1155Token, 'type'>
