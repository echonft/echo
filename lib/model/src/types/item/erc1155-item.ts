import type { AbstractItem } from '@echo/model/types/item/abstract-item'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'

export interface Erc1155Item extends AbstractItem {
  token: Erc1155Token
  quantity: number
}
