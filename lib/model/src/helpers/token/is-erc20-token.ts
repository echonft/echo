import { TokenType } from '@echo/model/constants/token-type'
import type { Erc20Token } from '@echo/model/types/token/erc20-token'
import type { Token } from '@echo/model/types/token/token'
import { propEq } from 'ramda'

export function isErc20Token(token: Token): token is Erc20Token {
  return propEq(TokenType.Erc20, 'type', token)
}
