import { ServerError } from '../error/server-error'
import {
  getListingsForCollection,
  getListingsForCollectionAsItem,
  getListingsForCollectionAsTarget
} from '@echo/firestore'
import { ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { both, has, isNotNil } from 'ramda'

export async function getNftCollectionListings(
  collectionId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
) {
  try {
    if (both(isNotNil, has('as'))(filters)) {
      if (filters.as === 'target') {
        return await getListingsForCollectionAsTarget(collectionId, filters, constraints)
      }
      return await getListingsForCollectionAsItem(collectionId, filters, constraints)
    }
    return await getListingsForCollection(collectionId, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting collection with id ${collectionId} listings with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
