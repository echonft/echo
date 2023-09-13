import { ListingFilterAsTarget } from '@echo/firestore/constants/listing-filter-as'
import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getListingsForUserTarget } from '@echo/firestore/crud/listing/get-listings-for-user-target'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'
import { isNil } from 'ramda'

export async function getUserListings(userId: string, filters?: ListingQueryFilters, constraints?: QueryConstraints) {
  try {
    if (!isNil(filters) && filters.as === ListingFilterAsTarget) {
      return await getListingsForUserTarget(userId, filters, constraints)
    }
    return await getListingsForCreator(userId, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting listings for user with id ${userId} with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
