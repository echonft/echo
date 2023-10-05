import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addOfferQueryFilters } from '@echo/firestore/helpers/crud/offer/add-offer-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { offerFields } from '@echo/firestore/types/model/offer/offer-document-data'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'

export async function getOffersForReceiver(
  receiverUsername: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
): Promise<FirestoreOffer[]> {
  let query = getOffersCollection().where('receiver.username', '==', receiverUsername)
  query = addOfferQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, offerFields, true)
  const results = await getQueryDocumentsData(query)
  return filterExpiredResults(results, constraints, filters)
}
