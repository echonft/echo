import type { TokenType } from '@echo/model/constants/token-type'
import type { Address } from '@echo/model/types/address'
import type { Erc721Nft, NftCollection, NftIndex } from '@echo/model/types/nft'

export interface AbstractToken {
  contract: Address
  name: string
  type: TokenType
}

export interface Erc20Token extends AbstractToken {
  decimals: number
  type: TokenType.Erc20
}

export type Erc20TokenIndex = Pick<Erc20Token, 'contract' | 'type'>

export interface Erc721Token
  extends Omit<AbstractToken, 'type'>,
    Omit<Erc721Nft, 'attributes' | 'collection' | 'owner'> {
  collection: Omit<NftCollection, 'contract'>
}

export interface Erc721TokenIndex extends NftIndex {
  type: TokenType.Erc721
}

export interface Erc1155Token extends Omit<Erc721Token, 'type'> {
  type: TokenType.Erc1155
}

export interface Erc1155TokenIndex extends NftIndex {
  type: TokenType.Erc1155
}

export type NftToken = Erc721Token | Erc1155Token

export interface TokenBalance<T extends Erc20Token | Erc1155Token> {
  token: T
  balance: number
}
