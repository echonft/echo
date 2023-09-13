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
import { head, invoker, isNil, map } from 'ramda'

export async function getListingsForCreator(
  userId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<FirestoreListing>[]> {
  let query = firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('creatorId', '==', userId)
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
