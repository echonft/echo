import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesDocumentsData } from '@echo/firestore/helpers/crud/query/get-queries-documents-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import { isNil, juxt, pipe } from 'ramda'

export async function getPendingListingsForCollection(slug: string): Promise<Listing[]> {
  const collection = await findCollectionBySlug(slug)
  if (isNil(collection)) {
    return []
  }
  const { id } = collection
  return pipe(
    getListingsCollectionReference,
    queryWhere<Listing>('state', 'not-in', READ_ONLY_LISTING_STATES),
    queryOrderBy<Listing>('state'),
    queryOrderBy<Listing>('expiresAt', 'desc'),
    juxt([
      queryWhere<Listing>('itemsNftCollectionIds', 'array-contains', id),
      queryWhere<Listing>('targetsIds', 'array-contains', id)
    ]),
    getQueriesDocumentsData
  )()
}
