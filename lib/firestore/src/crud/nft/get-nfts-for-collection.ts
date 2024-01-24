import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-documents-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export function getNftsForCollection(slug: string): Promise<Nft[]> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('collection.slug', '==', slug),
    queryOrderBy<Nft>('owner.discord.username'),
    queryOrderBy<Nft>('tokenId'),
    getQueryDocumentsData
  )()
}
