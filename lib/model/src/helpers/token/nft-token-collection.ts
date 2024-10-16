import type { NftCollection } from '@echo/model/types/nft/nft'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import { assoc, pipe, prop } from 'ramda'

export function nftTokenCollection(token: Erc721Token | Erc1155Token): NftCollection {
  const { contract } = token
  return pipe(prop('collection'), assoc('contract', contract))(token)
}
