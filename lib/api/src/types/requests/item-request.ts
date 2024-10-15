import type { Erc1155TokenIndex, Erc20TokenIndex, Erc721TokenIndex } from '@echo/model/types/token'

export interface ItemRequest<T extends Erc20TokenIndex | Erc721TokenIndex | Erc1155TokenIndex> {
  token: T
  quantity: T extends Erc721TokenIndex ? 1 : number
}

export interface ItemsRequest {
  erc20: ItemRequest<Erc20TokenIndex>[]
  erc721: ItemRequest<Erc721TokenIndex>[]
  erc1155: ItemRequest<Erc1155TokenIndex>[]
}
