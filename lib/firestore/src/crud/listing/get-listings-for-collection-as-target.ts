import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { addListingQueryFilters } from '@echo/firestore/helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { listingFields } from '@echo/firestore/types/model/listing-document-data'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

/**
 * Find listings for which a collection is in the targets
 * @param collectionId
 * @param filters
 * @param constraints
 */
export async function getListingsForCollectionAsTarget(
  collectionId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<FirestoreListing>[]> {
  let query = firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('targetsIds', 'array-contains', collectionId)
    .withConverter(listingDataConverter)

  query = addListingQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, listingFields, true)
  const querySnapshot = await query.get()
  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return []
  }

  const results = map(invoker(0, 'data'), querySnapshot.docs)
  return filterExpiredResults(results, constraints, filters)
}
