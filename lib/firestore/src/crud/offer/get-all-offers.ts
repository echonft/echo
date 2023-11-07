import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getOffersQueryResults } from '@echo/firestore/helpers/crud/offer/get-offers-query-results'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Offer } from '@echo/model/types/offer'
import { pipe } from 'ramda'

export function getAllOffers(filters?: OfferQueryFilters, constraints?: QueryConstraints<Offer>) {
  return pipe(getOffersCollectionReference, getOffersQueryResults(filters, constraints))()
}
