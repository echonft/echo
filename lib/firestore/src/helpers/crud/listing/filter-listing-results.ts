import { filterExpiredResults } from '@echo/firestore/helpers/crud/query/filter-expired-results'
import { filterResultsByState } from '@echo/firestore/helpers/crud/query/filter-results-by-state'
import { pickSelectConstraintFieldsFromResults } from '@echo/firestore/helpers/crud/query/pick-select-constraint-fields-from-results'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Listing } from '@echo/model/types/listing'
import { eqProps, pipe, uniqWith } from 'ramda'

export function filterListingResults(filters?: ListingQueryFilters, constraints?: QueryConstraints<Listing>) {
  return function (results: Listing[]) {
    return pipe<[Listing[]], Listing[], Listing[], Listing[], Listing[]>(
      filterResultsByState(filters),
      filterExpiredResults(filters),
      uniqWith(eqProps('id')),
      pickSelectConstraintFieldsFromResults(constraints)
    )(results)
  }
}
