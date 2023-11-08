import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryDocumentsRef } from '@echo/firestore/helpers/crud/get-query-documents-ref'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export async function getAllOutdatedNftReferences(before: number, constraints?: QueryConstraints<Nft>) {
  return pipe(
    getNftsCollectionReference,
    queryWhere('updatedAt', '<', before),
    addConstraintsToQuery(constraints),
    getQueryDocumentsRef
  )()
}
