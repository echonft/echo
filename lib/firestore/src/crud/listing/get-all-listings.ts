import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getListingsQueryResults } from '@echo/firestore/helpers/crud/listing/get-listings-query-results'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Listing } from '@echo/model/types/listing'
import { pipe } from 'ramda'

export function getAllListings(filters?: ListingQueryFilters, constraints?: QueryConstraints<Listing>) {
  return pipe(getListingsCollectionReference, getListingsQueryResults(filters, constraints))()
}
