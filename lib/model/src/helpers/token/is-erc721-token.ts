import { TokenType } from '@echo/model/constants/token-type'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import type { Token } from '@echo/model/types/token/token'
import { propEq } from 'ramda'

export function isErc721Token(token: Token): token is Erc721Token {
  return propEq(TokenType.Erc721, 'type', token)
}
