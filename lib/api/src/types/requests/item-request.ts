import type { Erc1155TokenIndex } from '@echo/model/types/token/erc1155-token'
import type { Erc20TokenIndex } from '@echo/model/types/token/erc20-token'
import type { Erc721TokenIndex } from '@echo/model/types/token/erc721-token'
import type { Strict } from '@echo/utils/types/strict'

export interface ItemRequest<T extends Erc20TokenIndex | Erc721TokenIndex | Erc1155TokenIndex> {
  readonly token: Strict<T, T>
  readonly quantity: T extends Erc721TokenIndex ? 1 : number
}

export interface ItemsRequest {
  readonly erc20: ItemRequest<Erc20TokenIndex>[]
  readonly erc721: ItemRequest<Erc721TokenIndex>[]
  readonly erc1155: ItemRequest<Erc1155TokenIndex>[]
}
