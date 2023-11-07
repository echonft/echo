import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getNftQueryResults } from '@echo/firestore/helpers/crud/nft/get-nft-query-results'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export async function getNftsForOwner(username: string, constraints?: QueryConstraints<Nft>) {
  return pipe(
    getNftsCollectionReference,
    queryWhere('owner.username', '==', username),
    getNftQueryResults(constraints)
  )()
}
