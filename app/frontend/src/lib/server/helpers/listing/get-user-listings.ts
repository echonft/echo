import { getListingsForCreator, getListingsForUserTarget } from '@echo/firestore'
import type { ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { ListingFilterAsTarget } from '@echo/firestore-types'
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
