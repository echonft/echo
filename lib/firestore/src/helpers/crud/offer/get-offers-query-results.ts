import { filterOfferResults } from '@echo/firestore/helpers/crud/offer/filter-offer-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Offer } from '@echo/model/types/offer'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOffersQueryResults(filters?: OfferQueryFilters, constraints?: QueryConstraints<Offer>) {
  return function (query: Query<Offer> | CollectionReference<Offer>) {
    return pipe(
      addConstraintsToQuery(constraints),
      getQueryDocumentsData,
      andThen(filterOfferResults(filters, constraints))
    )(query)
  }
}
