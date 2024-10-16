import type { Item } from '@echo/model/types/item/item'
import type { Erc20Token } from '@echo/model/types/token/erc20-token'

export interface Erc20Item extends Item {
  token: Erc20Token
  quantity: number
}
