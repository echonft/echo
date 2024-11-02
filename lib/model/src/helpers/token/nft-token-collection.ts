import type { NftCollection } from '@echo/model/types/nft'

import type { NftToken } from '@echo/model/types/token'
import { assoc, pipe, prop } from 'ramda'

export function nftTokenCollection(token: NftToken): NftCollection {
  const { contract } = token
  return pipe(prop('collection'), assoc('contract', contract))(token)
}
