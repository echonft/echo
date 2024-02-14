import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export function getOutdatedNftsForOwner(before: number, username: string): Promise<Nft[]> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('updatedAt', '<', before),
    queryWhere('owner.username', '==', username),
    getQueryData
  )()
}
