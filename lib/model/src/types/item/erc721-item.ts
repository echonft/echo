import type { Item } from '@echo/model/types/item/item'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'

export interface Erc721Item extends Item {
  token: Erc721Token
}
