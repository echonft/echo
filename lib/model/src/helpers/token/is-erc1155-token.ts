import { TokenType } from '@echo/model/constants/token-type'
import type { AbstractToken, Erc1155Token } from '@echo/model/types/token'
import { propEq } from 'ramda'

export function isErc1155Token(token: AbstractToken): token is Erc1155Token {
  return propEq(TokenType.Erc1155, 'type', token)
}
