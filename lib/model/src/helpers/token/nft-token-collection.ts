import type { NftCollection } from '@echo/model/types/nft/nft'
import type { NftToken } from '@echo/model/types/token/nft-token'
import { assoc, pipe, prop } from 'ramda'

export function nftTokenCollection(token: NftToken): NftCollection {
  const { contract } = token
  return pipe(prop('collection'), assoc('contract', contract))(token)
}
