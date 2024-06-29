import { getNftFromIndex } from '@echo/frontend/lib/helpers/nft/get-nft-from-index'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { map, pipe } from 'ramda'

export function getNftsFromIndexes(indexes: NftIndex[]): Promise<Nft[]> {
  return pipe(map(getNftFromIndex), promiseAll)(indexes)
}
