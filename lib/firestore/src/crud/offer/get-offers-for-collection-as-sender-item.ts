import { offerFields } from '@echo/firestore/constants/fields/offer/offer-fields'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addOfferQueryFilters } from '@echo/firestore/helpers/crud/offer/add-offer-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Offer } from '@echo/model/types/offer'

export async function getOffersForCollectionAsSenderItem(
  collectionId: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
): Promise<Offer[]> {
  let query = getOffersCollectionReference().where('senderItemsNftCollectionIds', 'array-contains', collectionId)
  query = addOfferQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, offerFields, true)
  const results = await getQueryDocumentsData(query)
  return filterExpiredResults(results, constraints, filters)
}
