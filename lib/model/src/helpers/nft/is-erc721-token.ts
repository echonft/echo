import type { Erc721Token, NftToken } from '@echo/model/types/token'

export function isErc721Token(token: NftToken): token is Erc721Token {
  return token.type === 'erc721'
}
