import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { Nft } from '@echo/model/types/nft/nft'
import { pipe } from 'ramda'

export function getAllNfts(): Promise<Nft[]> {
  return pipe(getNftsCollectionReference, getQueryData)()
}
