import type {
  AbstractToken,
  Erc1155Token,
  Erc1155TokenIndex,
  Erc20Token,
  Erc721Token,
  Erc721TokenIndex
} from '@echo/model/types/token'

export interface AbstractItem {
  token: AbstractToken
}

export interface Erc20Item extends AbstractItem {
  token: Erc20Token
  quantity: number
}

export interface Erc721Item extends AbstractItem {
  token: Erc721Token
}

export interface Erc721ItemIndex {
  token: Erc721TokenIndex
}

export interface Erc1155Item extends AbstractItem {
  token: Erc1155Token
  quantity: number
}

export interface Erc1155ItemIndex {
  token: Erc1155TokenIndex
  quantity: number
}

export type Item = Erc20Item | Erc721Item | Erc1155Item
export type NftItem = Erc721Item | Erc1155Item
