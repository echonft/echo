import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getListingsQueryResults } from '@echo/firestore/helpers/crud/listing/get-listings-query-results'
import { mergeQueryResults } from '@echo/firestore/helpers/crud/query/merge-query-results'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Listing } from '@echo/model/types/listing'
import { isNil } from 'ramda'

/**
 * Find listings for which a collection is in either the targets or the items
 * @param collectionId
 * @param filters
 * @param constraints
 */
export async function getListingsForCollection(
  collectionId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints<Listing>
): Promise<Listing[]> {
  const getResults = getListingsQueryResults(filters, constraints)
  const asItemQuery = getListingsCollectionReference().where('itemsNftCollectionIds', 'array-contains', collectionId)
  const asTargetQuery = getListingsCollectionReference().where('targetsIds', 'array-contains', collectionId)
  if (isNil(filters) || isNil(filters.as)) {
    return mergeQueryResults(asItemQuery, asTargetQuery, getResults)
  }
  if (filters.as === LISTING_FILTER_AS_ITEM) {
    return getResults(asItemQuery)
  }
  return getResults(asTargetQuery)
}
