import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export function findNftById(id: string): Promise<Nft | undefined> {
  return pipe(getNftsCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
