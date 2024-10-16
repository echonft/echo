import type { TokenType } from '@echo/model/constants/token-type'
import type { Token } from '@echo/model/types/token/token'

export interface Erc20Token extends Token {
  decimals: number
  type: TokenType.Erc20
}

export type Erc20TokenIndex = Pick<Erc20Token, 'contract' | 'type'>
