import { ListingFilterAsTarget } from '@echo/firestore/constants/listing-filter-as'
import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getListingsForUserTarget } from '@echo/firestore/crud/listing/get-listings-for-user-target'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import { isNil } from 'ramda'

export async function getUserListings(username: string, filters?: ListingQueryFilters, constraints?: QueryConstraints) {
  try {
    if (!isNil(filters) && filters.as === ListingFilterAsTarget) {
      return await getListingsForUserTarget(username, filters, constraints)
    }
    return await getListingsForCreator(username, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting listings for user with username ${username} with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
