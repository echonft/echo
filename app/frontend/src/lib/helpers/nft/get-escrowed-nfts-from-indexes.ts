import { getEscrowedNftFromIndex } from '@echo/frontend/lib/helpers/nft/get-escrowed-nft-from-index'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { map, pipe } from 'ramda'

export function getEscrowedNftsFromIndexes(indexes: NftIndex[]): Promise<Nft[]> {
  return pipe(map(getEscrowedNftFromIndex), promiseAll)(indexes)
}
