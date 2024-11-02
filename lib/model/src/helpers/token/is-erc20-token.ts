import { TokenType } from '@echo/model/constants/token-type'
import type { AbstractToken, Erc20Token } from '@echo/model/types/token'
import { propEq } from 'ramda'

export function isErc20Token(token: AbstractToken): token is Erc20Token {
  return propEq(TokenType.Erc20, 'type', token)
}
