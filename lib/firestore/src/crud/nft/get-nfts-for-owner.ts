import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-documents-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export async function getNftsForOwner(username: string): Promise<Nft[]> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('owner.username', '==', username),
    queryOrderBy<Nft>('tokenId'),
    getQueryDocumentsData
  )()
}
