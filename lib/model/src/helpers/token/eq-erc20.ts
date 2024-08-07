import type { OwnedERC20Token } from '@echo/model/types/owned-erc20-token'
import { dissoc, eqBy, isNil } from 'ramda'

function internalFn(tokenA: OwnedERC20Token): (tokenB: OwnedERC20Token) => boolean {
  return function (tokenB: OwnedERC20Token) {
    return eqBy(dissoc('balance'), tokenA, tokenB)
  }
}

export function eqERC20(tokenA: OwnedERC20Token, tokenB: OwnedERC20Token): boolean
export function eqERC20(tokenA: OwnedERC20Token): (tokenB: OwnedERC20Token) => boolean
export function eqERC20(
  tokenA: OwnedERC20Token,
  tokenB?: OwnedERC20Token
): boolean | ((tokenB: OwnedERC20Token) => boolean) {
  if (isNil(tokenB)) {
    return internalFn(tokenA)
  }
  return internalFn(tokenA)(tokenB)
}
