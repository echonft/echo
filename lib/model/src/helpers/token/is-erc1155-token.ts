import { TokenType } from '@echo/model/constants/token-type'
import type { AbstractToken } from '@echo/model/types/token/abstract-token'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import { propEq } from 'ramda'

export function isErc1155Token(token: AbstractToken): token is Erc1155Token {
  return propEq(TokenType.Erc1155, 'type', token)
}
