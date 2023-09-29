import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addListingQueryFilters } from '@echo/firestore/helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { listingFields } from '@echo/firestore/types/model/listing/listing-document-data'
import { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { partialRight, pipe } from 'ramda'

export async function getAllListings(filters?: ListingQueryFilters, constraints?: QueryConstraints) {
  const query = firestoreApp().collection(CollectionName.LISTINGS).withConverter(listingDataConverter)
  const results = await pipe(
    partialRight(addListingQueryFilters, [filters]),
    partialRight(addConstraintsToQuery, [constraints, listingFields, true]),
    getQueryDocumentsData
  )(query)
  return filterExpiredResults(results, constraints, filters)
}
