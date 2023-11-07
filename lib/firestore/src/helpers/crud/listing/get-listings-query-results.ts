import { filterListingResults } from '@echo/firestore/helpers/crud/listing/filter-listing-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Listing } from '@echo/model/types/listing'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getListingsQueryResults(filters?: ListingQueryFilters, constraints?: QueryConstraints<Listing>) {
  return function (query: Query<Listing> | CollectionReference<Listing>) {
    return pipe(
      addConstraintsToQuery(constraints),
      getQueryDocumentsData,
      andThen(filterListingResults(filters, constraints))
    )(query)
  }
}
