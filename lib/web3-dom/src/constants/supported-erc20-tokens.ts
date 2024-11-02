import { TokenType } from '@echo/model/constants/token-type'
import { Chain } from '@echo/model/constants/chain'
import type { Erc20Token } from '@echo/model/types/token'
import { type NonEmptyArray } from 'ramda'

export const supportedErc20Tokens: Record<Chain, NonEmptyArray<Erc20Token>> = {
  blast: [
    {
      contract: { address: '0x4300000000000000000000000000000000000004', chain: Chain.Blast },
      name: 'WETH',
      decimals: 18,
      type: TokenType.Erc20
    },
    {
      contract: { address: '0x4300000000000000000000000000000000000003', chain: Chain.Blast },
      name: 'USDB',
      decimals: 18,
      type: TokenType.Erc20
    }
  ],
  // TODO set the right contract values
  blast_sepolia: [
    {
      contract: { address: '0x4300000000000000000000000000000000000004', chain: Chain.BlastSepolia },
      name: 'WETH',
      decimals: 18,
      type: TokenType.Erc20
    },
    {
      contract: { address: '0x4300000000000000000000000000000000000003', chain: Chain.BlastSepolia },
      name: 'USDB',
      decimals: 18,
      type: TokenType.Erc20
    }
  ],
  ethereum: [
    {
      contract: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', chain: Chain.Ethereum },
      name: 'WETH',
      decimals: 18,
      type: TokenType.Erc20
    },
    {
      contract: { address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', chain: Chain.Ethereum },
      name: 'USDC',
      decimals: 6,
      type: TokenType.Erc20
    }
  ],
  sepolia: [
    {
      contract: { address: '0x7b79995e5f793a07bc00c21412e50ecae098e7f9', chain: Chain.Sepolia },
      name: 'WETH',
      decimals: 18,
      type: TokenType.Erc20
    }
  ],
  sei: [
    {
      contract: { address: '0xb75d0b03c06a926e488e2659df1a861f860bd3d1', chain: Chain.Sei },
      name: 'USDT',
      decimals: 18,
      type: TokenType.Erc20
    },
    {
      contract: { address: '0x3894085ef7ff0f0aedf52e2a2704928d1ec074f1', chain: Chain.Sei },
      name: 'USDC',
      decimals: 18,
      type: TokenType.Erc20
    }
  ]
}
