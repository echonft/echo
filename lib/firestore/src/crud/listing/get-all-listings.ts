import { listingFields } from '@echo/firestore/constants/fields/listing/listing-fields'
import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addListingQueryFilters } from '@echo/firestore/helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { partialRight, pipe } from 'ramda'

export async function getAllListings(filters?: ListingQueryFilters, constraints?: QueryConstraints) {
  const query = getListingsCollection()
  const results = await pipe(
    partialRight(addListingQueryFilters, [filters]),
    partialRight(addConstraintsToQuery, [constraints, listingFields, true]),
    getQueryDocumentsData
  )(query)
  return filterExpiredResults(results, constraints, filters)
}
