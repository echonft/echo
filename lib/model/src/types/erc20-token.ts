import type { TokenType } from '@echo/model/constants/token-type'
import type { AbstractToken } from '@echo/model/types/abstract-token'

export interface Erc20Token extends AbstractToken {
  decimals: number
  type: TokenType.Erc20
}

export type Erc20TokenIndex = Pick<Erc20Token, 'contract' | 'type'>
