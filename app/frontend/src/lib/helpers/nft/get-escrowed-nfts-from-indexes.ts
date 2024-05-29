import { getNftFromIndex } from '@echo/frontend/lib/helpers/nft/get-nft-from-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { map, pipe } from 'ramda'

export function getEscrowedNftsFromIndexes(indexes: NftIndex[]): Promise<Nft[]> {
  return pipe(map(getNftFromIndex), promiseAll)(indexes)
}
