import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { TokenBalance } from '@echo/model/types/token-balance'

export function getErc20TokenBalance(token: Erc20Token): Promise<TokenBalance<Erc20Token>> {
  switch (token.name) {
    case 'WETH':
      return Promise.resolve({ token, balance: 0.987654 })
    case 'USDB':
      return Promise.resolve({ token, balance: 1234.56789 })
    case 'USDC':
      return Promise.resolve({ token, balance: 2000 })
    default:
      return Promise.resolve({ token, balance: 987654 })
  }
}
