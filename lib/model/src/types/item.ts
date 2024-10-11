import type { Erc1155Token, Erc20Token, Erc721Token, Token } from '@echo/model/types/token'

export interface Item<T extends Token> {
  token: T
  quantity: T extends Erc721Token ? 1 : number
}

export interface Items {
  erc20: Item<Erc20Token>[]
  erc721: Item<Erc721Token>[]
  erc1155: Item<Erc1155Token>[]
}
