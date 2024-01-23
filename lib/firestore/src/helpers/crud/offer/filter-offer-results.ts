import { filterResultsByState } from '@echo/firestore/helpers/crud/query/filter-results-by-state'
import { pickSelectConstraintFieldsFromResults } from '@echo/firestore/helpers/crud/query/pick-select-constraint-fields-from-results'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Offer } from '@echo/model/types/offer'
import { eqProps, pipe, uniqWith } from 'ramda'

export function filterOfferResults(filters?: OfferQueryFilters, constraints?: QueryConstraints<Offer>) {
  return function (results: Offer[]) {
    return pipe<[Offer[]], Offer[], Offer[], Offer[]>(
      filterResultsByState(filters),
      uniqWith(eqProps('id')),
      pickSelectConstraintFieldsFromResults(constraints)
    )(results)
  }
}
