import { TokenType } from '@echo/model/constants/token-type'
import type { Erc20Token } from '@echo/model/types/token'
import { type NonEmptyArray } from 'ramda'

export const supportedErc20Tokens: NonEmptyArray<Erc20Token> = [
  {
    contract: '0xb75d0b03c06a926e488e2659df1a861f860bd3d1',
    name: 'USDT',
    decimals: 18,
    type: TokenType.Erc20
  },
  {
    contract: '0x3894085ef7ff0f0aedf52e2a2704928d1ec074f1',
    name: 'USDC',
    decimals: 18,
    type: TokenType.Erc20
  }
]
