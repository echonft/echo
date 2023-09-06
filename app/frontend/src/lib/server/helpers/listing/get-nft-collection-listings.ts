import { ServerError } from '../error/server-error'
import {
  getListingsForCollection,
  getListingsForCollectionAsItem,
  getListingsForCollectionAsTarget
} from '@echo/firestore'
import { ListingAsQueryFilter, ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { isNil } from 'ramda'

export async function getNftCollectionListings(
  collectionId: string,
  constraints?: QueryConstraints,
  filters?: ListingQueryFilters,
  asFilter?: ListingAsQueryFilter
) {
  try {
    if (!isNil(asFilter)) {
      const { as } = asFilter
      if (as === 'target') {
        return await getListingsForCollectionAsTarget(collectionId, filters, constraints)
      }
      return await getListingsForCollectionAsItem(collectionId, filters, constraints)
    }
    return await getListingsForCollection(collectionId, filters, constraints)
  } catch (e) {
    throw new ServerError()
  }
}
