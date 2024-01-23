import { OFFER_FILTER_AS_RECEIVER } from '@echo/firestore/constants/offer/offer-filter-as'
import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getOffersQueryResults } from '@echo/firestore/helpers/crud/offer/get-offers-query-results'
import { mergeQueryResults } from '@echo/firestore/helpers/crud/query/merge-query-results'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Offer } from '@echo/model/types/offer'
import { isNil } from 'ramda'

export async function getOffersForCollection(
  collectionSlug: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints<Offer>
): Promise<Offer[]> {
  const collection = await findCollectionBySlug(collectionSlug)
  if (isNil(collection)) {
    return []
  }
  const getResults = getOffersQueryResults(filters, constraints)
  const asReceiverQuery = getOffersCollectionReference().where(
    'receiverItemsNftCollectionIds',
    'array-contains',
    collection.id
  )
  const asSenderQuery = getOffersCollectionReference().where(
    'senderItemsNftCollectionIds',
    'array-contains',
    collection.id
  )
  if (isNil(filters) || isNil(filters.as)) {
    return mergeQueryResults(asReceiverQuery, asSenderQuery, getResults)
  }
  if (filters.as === OFFER_FILTER_AS_RECEIVER) {
    return getResults(asReceiverQuery)
  }
  return getResults(asSenderQuery)
}
