import { TokenType } from '@echo/model/constants/token-type'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { Nft } from '@echo/model/types/nft/nft'
import { propEq } from 'ramda'

export function isErc721Nft(nft: Nft): nft is Erc721Nft {
  return propEq(TokenType.Erc721, 'type', nft)
}
