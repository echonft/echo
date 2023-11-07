import { getListingsForCollection } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { Listing } from '@echo/model/types/listing'

export async function guarded_getCollectionListings(
  collectionId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints<Listing>
) {
  try {
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
