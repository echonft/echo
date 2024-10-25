import { TokenType } from '@echo/model/constants/token-type'
import type { AbstractToken } from '@echo/model/types/abstract-token'
import type { Erc721Token } from '@echo/model/types/erc721-token'
import { propEq } from 'ramda'

export function isErc721Token(token: AbstractToken): token is Erc721Token {
  return propEq(TokenType.Erc721, 'type', token)
}
