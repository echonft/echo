import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { filterExpiredResults } from '../../helpers/crud/filter-expired-results'
import { addListingQueryFilters } from '../../helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '../../helpers/query/add-constraints-to-query'
import { firestore } from '../../services/firestore'
import { listingFields } from '../../types/model/listing-document-data'
import { Listing, ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { head, invoker, isNil, map } from 'ramda'

export async function getListingsForNft(
  nftId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<Listing>[]> {
  let query = firestore()
    .collection(CollectionName.LISTINGS)
    .where('itemsNftIds', 'array-contains', nftId)
    .withConverter(listingDataConverter)

  query = addListingQueryFilters(query, filters)
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
