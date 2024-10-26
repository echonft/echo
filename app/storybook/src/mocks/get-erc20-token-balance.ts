import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { TokenBalance } from '@echo/model/types/token-balance'
import type { GetErc20TokenBalanceArgs } from '@echo/web3-dom/services/get-erc20-token-balance'

export function getErc20TokenBalance(args: GetErc20TokenBalanceArgs): Promise<TokenBalance<Erc20Token>> {
  const { token } = args
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
