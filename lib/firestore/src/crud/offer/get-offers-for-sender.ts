import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { filterExpiredResults } from '../../helpers/crud/filter-expired-results'
import { addOfferQueryFilters } from '../../helpers/crud/offer/add-offer-query-filters'
import { addConstraintsToQuery } from '../../helpers/query/add-constraints-to-query'
import { firestore } from '../../services/firestore'
import { listingFields } from '../../types/model/listing-document-data'
import { ListingQueryFilters, Offer, QueryConstraints } from '@echo/firestore-types'
import { head, invoker, isNil, map } from 'ramda'

export async function getOffersForSender(
  senderId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<Offer>[]> {
  let query = firestore()
    .collection(CollectionName.OFFERS)
    .where('senderId', '==', senderId)
    .withConverter(offerDataConverter)

  query = addOfferQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, listingFields, true)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return []
  }

  const documentSnapshot = head(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return []
  }

  const results = map(invoker(0, 'data'), querySnapshot.docs)
  return filterExpiredResults(results, constraints, filters)
}
