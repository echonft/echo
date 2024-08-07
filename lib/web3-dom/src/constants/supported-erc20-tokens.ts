import type { ERC20Token } from '@echo/model/types/erc20-token'
import { type NonEmptyArray } from 'ramda'

export const blastSupportedErc20Tokens: NonEmptyArray<ERC20Token> = [
  { contract: '0x4300000000000000000000000000000000000004', name: 'WETH', decimals: 18 },
  { contract: '0x4300000000000000000000000000000000000003', name: 'USDB', decimals: 18 }
]

export const ethereumSupportedERC20Tokens: NonEmptyArray<ERC20Token> = [
  { contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', name: 'WETH', decimals: 18 }
]

export const sepoliaSupportedERC20Tokens: NonEmptyArray<ERC20Token> = [
  { contract: '0x7b79995e5f793a07bc00c21412e50ecae098e7f9', name: 'WETH', decimals: 18 }
]
