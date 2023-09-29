import { getAllListings as firestoreGetAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'

export async function getAllListings(filters?: ListingQueryFilters, constraints?: QueryConstraints) {
  try {
    return await firestoreGetAllListings(filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting all listings with filters ${JSON.stringify(filters)} and constraints ${JSON.stringify(
        constraints
      )}`,
      e
    )
  }
}
