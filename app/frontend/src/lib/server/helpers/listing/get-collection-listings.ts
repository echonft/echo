import { ListingFilterAsTarget } from '@echo/firestore/constants/listing-filter-as'
import { getListingsForCollection } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { getListingsForCollectionAsItem } from '@echo/firestore/crud/listing/get-listings-for-collection-as-item'
import { getListingsForCollectionAsTarget } from '@echo/firestore/crud/listing/get-listings-for-collection-as-target'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'
import { isNil } from 'ramda'

export async function getCollectionListings(
  collectionId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
) {
  try {
    if (!isNil(filters) && !isNil(filters.as)) {
      if (filters.as === ListingFilterAsTarget) {
        return await getListingsForCollectionAsTarget(collectionId, filters, constraints)
      }
      return await getListingsForCollectionAsItem(collectionId, filters, constraints)
    }
    return await getListingsForCollection(collectionId, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting listings for collection with id ${collectionId} with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
