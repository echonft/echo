import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { addOfferQueryFilters } from '@echo/firestore/helpers/crud/offer/add-offer-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { offerFields } from '@echo/firestore/types/model/offer/offer-document-data'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getOffersForSender(
  senderUsername: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<FirestoreOffer>[]> {
  let query = firestoreApp()
    .collection(CollectionName.OFFERS)
    .where('sender.username', '==', senderUsername)
    .withConverter(offerDataConverter)

  query = addOfferQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, offerFields, true)
  const querySnapshot = await query.get()
  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return []
  }

  const results = map(invoker(0, 'data'), querySnapshot.docs)
  return filterExpiredResults(results, constraints, filters)
}
