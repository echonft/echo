import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getListingsQueryResults } from '@echo/firestore/helpers/crud/listing/get-listings-query-results'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Listing } from '@echo/model/types/listing'
import { pipe } from 'ramda'

export function getListingsForNft(
  nftId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints<Listing>
): Promise<Listing[]> {
  return pipe(
    getListingsCollectionReference,
    queryWhere('itemsNftIds', 'array-contains', nftId),
    getListingsQueryResults(filters, constraints)
  )()
}
