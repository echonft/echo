import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryDocumentsRef } from '@echo/firestore/helpers/crud/get-query-documents-ref'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'

export async function getAllOutdatedNftReferences(before: number, constraints?: QueryConstraints) {
  let query = getNftsCollectionReference().where('updatedAt', '<', before)
  query = addConstraintsToQuery(query, constraints)
  return await getQueryDocumentsRef(query)
}
