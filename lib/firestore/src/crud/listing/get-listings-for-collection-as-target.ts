import { listingFields } from '@echo/firestore/constants/fields/listing/listing-fields'
import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addListingQueryFilters } from '@echo/firestore/helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Listing } from '@echo/model/types/listing'

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
): Promise<Listing[]> {
  let query = getListingsCollection().where('targetsIds', 'array-contains', collectionId)
  query = addListingQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, listingFields, true)
  const results = await getQueryDocumentsData(query)
  return filterExpiredResults(results, constraints, filters)
}
