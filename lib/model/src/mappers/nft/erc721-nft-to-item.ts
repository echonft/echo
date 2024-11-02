import { erc721NftToToken } from '@echo/model/mappers/nft/erc721-nft-to-token'

import type { Erc721Item } from '@echo/model/types/item'

import type { Erc721Nft } from '@echo/model/types/nft'
import { objOf, pipe } from 'ramda'

export function erc721NftToItem(nft: Erc721Nft): Erc721Item {
  return pipe(erc721NftToToken, objOf('token'))(nft)
}
