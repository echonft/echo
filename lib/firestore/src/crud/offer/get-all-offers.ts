import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addOfferQueryFilters } from '@echo/firestore/helpers/crud/offer/add-offer-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { offerFields } from '@echo/firestore/types/model/offer/offer-document-data'
import { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { partialRight, pipe } from 'ramda'

export async function getAllOffers(filters?: OfferQueryFilters, constraints?: QueryConstraints) {
  const query = getOffersCollection()
  const results = await pipe(
    partialRight(addOfferQueryFilters, [filters]),
    partialRight(addConstraintsToQuery, [constraints, offerFields, true]),
    getQueryDocumentsData
  )(query)
  return filterExpiredResults(results, constraints, filters)
}
