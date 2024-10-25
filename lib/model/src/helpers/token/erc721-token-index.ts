import { TokenType } from '@echo/model/constants/token-type'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import type { Erc721Token, Erc721TokenIndex } from '@echo/model/types/erc721-token'
import { assoc, pipe } from 'ramda'

export function erc721TokenIndex(token: Erc721Token): Erc721TokenIndex {
  return pipe<[Erc721Token], NftIndex, Erc721TokenIndex>(nftIndex, assoc('type', TokenType.Erc721))(token)
}
