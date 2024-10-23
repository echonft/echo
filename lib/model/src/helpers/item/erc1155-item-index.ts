import { erc1155TokenIndex } from '@echo/model/helpers/token/erc1155-token-index'
import type { Erc1155Item, Erc1155ItemIndex } from '@echo/model/types/item/erc1155-item'
import { modify } from 'ramda'

export function erc1155ItemIndex(item: Erc1155Item): Erc1155ItemIndex {
  return modify('token', erc1155TokenIndex, item)
}
