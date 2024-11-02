import { TokenType } from '@echo/model/constants/token-type'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import type { Erc1155Token, Erc1155TokenIndex } from '@echo/model/types/token'
import { assoc, pipe } from 'ramda'

export function erc1155TokenIndex(token: Erc1155Token): Erc1155TokenIndex {
  return pipe<[Erc1155Token], NftIndex, Erc1155TokenIndex>(nftIndex, assoc('type', TokenType.Erc1155))(token)
}
