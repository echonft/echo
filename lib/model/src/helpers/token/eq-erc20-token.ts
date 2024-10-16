import type { Erc20Token } from '@echo/model/types/token/erc20-token'
import { eqProps, isNil } from 'ramda'

export function eqErc20Token(tokenA: Erc20Token, tokenB: Erc20Token): boolean
export function eqErc20Token(tokenA: Erc20Token): (tokenB: Erc20Token) => boolean
export function eqErc20Token(tokenA: Erc20Token, tokenB?: Erc20Token): boolean | ((tokenB: Erc20Token) => boolean) {
  if (isNil(tokenB)) {
    return eqProps('contract', tokenA)
  }
  return eqProps('contract', tokenA, tokenB)
}
