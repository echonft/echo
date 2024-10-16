import type { Item } from '@echo/model/types/item/item'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'

export interface Erc1155Item extends Item {
  token: Erc1155Token
  quantity: number
}
