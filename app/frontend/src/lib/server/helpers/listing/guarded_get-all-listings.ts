import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { Listing } from '@echo/model/types/listing'

export function guarded_getAllListings(filters?: ListingQueryFilters, constraints?: QueryConstraints<Listing>) {
  try {
    return getAllListings(filters, constraints)
  } catch (e) {
    throw new ServerError('error getting all listings', e)
  }
}
