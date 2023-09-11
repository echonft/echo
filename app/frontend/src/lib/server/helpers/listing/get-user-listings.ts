import { getListingsForCreator } from '@echo/firestore'
import type { ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'

export async function getUserListings(userId: string, filters?: ListingQueryFilters, constraints?: QueryConstraints) {
  try {
    return await getListingsForCreator(userId, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting user with id ${userId} listings with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
