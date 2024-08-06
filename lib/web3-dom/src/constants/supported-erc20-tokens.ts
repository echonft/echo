import type { ERC20Token } from '@echo/web3-dom/types/erc20-token'
import { head } from 'ramda'

export const supportedERC20Tokens: ERC20Token[] = [
  { contract: '0x4300000000000000000000000000000000000004', name: 'WETH', decimals: 18 },
  { contract: '0x4300000000000000000000000000000000000003', name: 'USDB', decimals: 18 }
]
// FIXME
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const defaultERC20Token = head(supportedERC20Tokens)!
