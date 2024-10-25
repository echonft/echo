import type { Erc20Token, Erc20TokenIndex } from '@echo/model/types/erc20-token'
import { pick } from 'ramda'

export function erc20TokenIndex(token: Erc20Token): Erc20TokenIndex {
  return pick(['contract', 'type'], token)
}
