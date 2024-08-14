import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { ChainName } from '@echo/utils/types/chain-name'
import { type NonEmptyArray } from 'ramda'

export const supportedErc20Tokens: Record<ChainName, NonEmptyArray<Erc20Token>> = {
  blast: [
    { contract: '0x4300000000000000000000000000000000000004', name: 'WETH', decimals: 18 },
    { contract: '0x4300000000000000000000000000000000000003', name: 'USDB', decimals: 18 }
  ],
  // TODO set the right contract values
  blast_sepolia: [
    { contract: '0x4300000000000000000000000000000000000004', name: 'WETH', decimals: 18 },
    { contract: '0x4300000000000000000000000000000000000003', name: 'USDB', decimals: 18 }
  ],
  ethereum: [
    {
      contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      name: 'WETH',
      decimals: 18
    },
    { contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', name: 'USDC', decimals: 6 }
  ],
  sepolia: [{ contract: '0x7b79995e5f793a07bc00c21412e50ecae098e7f9', name: 'WETH', decimals: 18 }]
}
