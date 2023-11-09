import { OFFER_FILTER_AS_RECEIVER } from '@echo/firestore/constants/offer/offer-filter-as'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getOffersQueryResults } from '@echo/firestore/helpers/crud/offer/get-offers-query-results'
import { mergeQueryResults } from '@echo/firestore/helpers/crud/query/merge-query-results'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Offer } from '@echo/model/types/offer'
import { isNil } from 'ramda'

export function getOffersForCollection(
  collectionId: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints<Offer>
): Promise<Offer[]> {
  const getResults = getOffersQueryResults(filters, constraints)
  const asReceiverQuery = getOffersCollectionReference().where(
    'receiverItemsNftCollectionIds',
    'array-contains',
    collectionId
  )
  const asSenderQuery = getOffersCollectionReference().where(
    'senderItemsNftCollectionIds',
    'array-contains',
    collectionId
  )
  if (isNil(filters) || isNil(filters.as)) {
    return mergeQueryResults(asReceiverQuery, asSenderQuery, getResults)
  }
  if (filters.as === OFFER_FILTER_AS_RECEIVER) {
    return getResults(asReceiverQuery)
  }
  return getResults(asSenderQuery)
}
