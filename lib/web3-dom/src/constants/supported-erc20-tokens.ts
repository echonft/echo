import type { Erc20Token } from '@echo/model/types/token'
import type { ChainName } from '@echo/utils/types/chain-name'
import { type NonEmptyArray } from 'ramda'

export const supportedErc20Tokens: Record<ChainName, NonEmptyArray<Erc20Token>> = {
  blast: [
    {
      contract: { address: '0x4300000000000000000000000000000000000004', chain: 'blast' },
      name: 'WETH',
      decimals: 18,
      type: 'erc20'
    },
    {
      contract: { address: '0x4300000000000000000000000000000000000003', chain: 'blast' },
      name: 'USDB',
      decimals: 18,
      type: 'erc20'
    }
  ],
  // TODO set the right contract values
  blast_sepolia: [
    {
      contract: { address: '0x4300000000000000000000000000000000000004', chain: 'blast_sepolia' },
      name: 'WETH',
      decimals: 18,
      type: 'erc20'
    },
    {
      contract: { address: '0x4300000000000000000000000000000000000003', chain: 'blast_sepolia' },
      name: 'USDB',
      decimals: 18,
      type: 'erc20'
    }
  ],
  ethereum: [
    {
      contract: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', chain: 'ethereum' },
      name: 'WETH',
      decimals: 18,
      type: 'erc20'
    },
    {
      contract: { address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', chain: 'ethereum' },
      name: 'USDC',
      decimals: 6,
      type: 'erc20'
    }
  ],
  sepolia: [
    {
      contract: { address: '0x7b79995e5f793a07bc00c21412e50ecae098e7f9', chain: 'sepolia' },
      name: 'WETH',
      decimals: 18,
      type: 'erc20'
    }
  ]
}
