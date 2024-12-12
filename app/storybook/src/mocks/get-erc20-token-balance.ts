import type { Erc20Token, TokenBalance } from '@echo/model/types/token'
import { rangeDelay } from 'delay'

function getBalance(token: Erc20Token): number {
  switch (token.name) {
    case 'WETH':
      return 0.987654
    case 'USDB':
      return 1234.56789
    case 'USDC':
      return 2000
    default:
      return 987654
  }
}

export function getErc20TokenBalance(token: Erc20Token): Promise<TokenBalance<Erc20Token>> {
  const balance = getBalance(token)
  return rangeDelay(800, 1600, { value: { token, balance } })
}
