import { erc721TokenIndex } from '@echo/model/helpers/token/erc721-token-index'
import type { Erc721Item, Erc721ItemIndex } from '@echo/model/types/erc721-item'
import { modify } from 'ramda'

export function erc721ItemIndex(item: Erc721Item): Erc721ItemIndex {
  return modify('token', erc721TokenIndex, item)
}
