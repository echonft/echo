import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { LISTING_STATES, READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import type { ListingState } from '@echo/model/types/listing-state'
import { isIn } from '@echo/utils/fp/is-in'
import { now } from '@echo/utils/helpers/now'
import { isNil, juxt, pipe, reject } from 'ramda'

export async function getPendingListingsForCollection(slug: string): Promise<Listing[]> {
  const collection = await findCollectionBySlug(slug)
  if (isNil(collection)) {
    return []
  }
  const { id } = collection
  return pipe(
    getListingsCollectionReference,
    queryWhere('state', 'in', reject(isIn<ListingState>(READ_ONLY_LISTING_STATES), LISTING_STATES)),
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    juxt([queryWhere('itemsNftCollectionIds', 'array-contains', id), queryWhere('targetsIds', 'array-contains', id)]),
    getQueriesDocuments
  )()
}
