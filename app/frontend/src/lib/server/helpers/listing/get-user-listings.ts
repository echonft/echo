import { ServerError } from '../error/server-error'
import { getListingsForCreator } from '@echo/firestore'
import { ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'

export async function getUserListings(userId: string, filters?: ListingQueryFilters, constraints?: QueryConstraints) {
  try {
    return await getListingsForCreator(userId, filters, constraints)
  } catch (e) {
    throw new ServerError()
  }
}
