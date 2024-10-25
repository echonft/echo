import type { AbstractItem } from '@echo/model/types/abstract-item'
import type { Erc1155Token, Erc1155TokenIndex } from '@echo/model/types/erc1155-token'

export interface Erc1155Item extends AbstractItem {
  token: Erc1155Token
  quantity: number
}

export interface Erc1155ItemIndex {
  token: Erc1155TokenIndex
  quantity: number
}
