import type { AbstractItem } from '@echo/model/types/item/abstract-item'
import type { Erc20Token } from '@echo/model/types/token/erc20-token'

export interface Erc20Item extends AbstractItem {
  token: Erc20Token
  quantity: number
}
