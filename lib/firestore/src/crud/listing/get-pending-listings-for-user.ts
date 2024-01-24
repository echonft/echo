import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesDocumentsData } from '@echo/firestore/helpers/crud/query/get-queries-documents-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { LISTING_STATES, READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import type { ListingState } from '@echo/model/types/listing-state'
import type { Nft } from '@echo/model/types/nft'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { isEmpty, juxt, map, partial, path, pipe, reject, splitEvery, uniq } from 'ramda'

export async function getPendingListingsForUser(username: string): Promise<Listing[]> {
  const nfts = await getNftsForOwner(username)
  if (isEmpty(nfts)) {
    return []
  }
  const collectionIds = pipe<[Nft[]], string[], string[], string[][]>(
    map<Nft, string>(nonNullableReturn(path<string>(['collection', 'id']))),
    uniq,
    splitEvery(30)
  )(nfts)
  return pipe(
    getListingsCollectionReference,
    queryWhere<Listing>('creator.username', '!=', username),
    queryWhere<Listing>('state', 'in', reject(isIn<ListingState>(READ_ONLY_LISTING_STATES), LISTING_STATES)),
    queryOrderBy<Listing>('creator.username'),
    queryOrderBy<Listing>('expiresAt', 'desc'),
    juxt(map(partial(queryWhere<Listing>, ['targetsIds', 'array-contains-any']), collectionIds)),
    getQueriesDocumentsData
  )()
}
