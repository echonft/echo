import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { Listing } from '@echo/model/types/listing'

export async function guarded_getListingsForUser(
  username: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints<Listing>
) {
  try {
    return await getListingsForUser(username, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting listings for user with username ${username} with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
