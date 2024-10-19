import type { AbstractItem } from '@echo/model/types/item/abstract-item'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'

export interface Erc721Item extends AbstractItem {
  token: Erc721Token
}
