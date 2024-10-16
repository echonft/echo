import { TokenType } from '@echo/model/constants/token-type'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Token } from '@echo/model/types/token/token'
import { propEq } from 'ramda'

export function isErc1155Token(token: Token): token is Erc1155Token {
  return propEq(TokenType.Erc1155, 'type', token)
}
