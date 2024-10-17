import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc1155TokenIndex } from '@echo/model/types/token/erc1155-token'

export interface Erc1155ItemRequest extends Omit<Erc1155Item, 'token'> {
  readonly token: Erc1155TokenIndex
}
