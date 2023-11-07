import { OfferFilterAsReceiver } from '@echo/firestore/constants/offer-filter-as'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getOffersQueryResults } from '@echo/firestore/helpers/crud/offer/get-offers-query-results'
import { mergeQueryResults } from '@echo/firestore/helpers/crud/query/merge-query-results'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Offer } from '@echo/model/types/offer'
import { isNil } from 'ramda'

export async function getOffersForUser(
  username: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints<Offer>
): Promise<Offer[]> {
  const getResults = getOffersQueryResults(filters, constraints)
  const asReceiverQuery = getOffersCollectionReference().where('receiver.username', '==', username)
  const asSenderQuery = getOffersCollectionReference().where('sender.username', '==', username)
  if (isNil(filters) || isNil(filters.as)) {
    return mergeQueryResults(asReceiverQuery, asSenderQuery, getResults)
  }
  if (filters.as === OfferFilterAsReceiver) {
    return getResults(asReceiverQuery)
  }
  return getResults(asSenderQuery)
}
