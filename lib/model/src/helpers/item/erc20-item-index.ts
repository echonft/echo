import { erc20TokenIndex } from '@echo/model/helpers/token/erc20-token-index'
import type { Erc20Item, Erc20ItemIndex } from '@echo/model/types/item/erc20-item'
import { modify } from 'ramda'

export function erc20ItemIndex(item: Erc20Item): Erc20ItemIndex {
  return modify('token', erc20TokenIndex, item)
}
