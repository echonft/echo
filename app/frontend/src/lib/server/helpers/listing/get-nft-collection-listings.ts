import {
  getListingsForCollection,
  getListingsForCollectionAsItem,
  getListingsForCollectionAsTarget
} from '@echo/firestore'
import type { ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { ListingFilterAsTarget } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'
import { both, has, isNotNil } from 'ramda'

export async function getNftCollectionListings(
  collectionId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
) {
  try {
    if (both(isNotNil, has('as'))(filters)) {
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
