import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addListingQueryFilters } from '@echo/firestore/helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { listingFields } from '@echo/firestore/types/model/listing/listing-document-data'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'

/**
 * Find listings for which a collection is in the items
 * @param collectionId
 * @param filters
 * @param constraints
 */
export async function getListingsForCollectionAsItem(
  collectionId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<FirestoreListing[]> {
  let query = getListingsCollection().where('itemsNftCollectionIds', 'array-contains', collectionId)
  query = addListingQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, listingFields, true)
  const results = await getQueryDocumentsData(query)
  return filterExpiredResults(results, constraints, filters)
}
