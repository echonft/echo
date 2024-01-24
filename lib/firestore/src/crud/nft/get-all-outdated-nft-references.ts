import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryDocumentsRef } from '@echo/firestore/helpers/crud/get-query-documents-ref'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export async function getAllOutdatedNftReferences(before: number) {
  return pipe(getNftsCollectionReference, queryWhere<Nft>('updatedAt', '<', before), getQueryDocumentsRef)()
}
