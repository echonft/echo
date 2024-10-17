import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { notReadOnlyListingStates } from '@echo/model/constants/listing-state'
import { type Listing } from '@echo/model/types/listing/listing'
import type { Slug } from '@echo/model/types/slug'
import { now } from '@echo/utils/helpers/now'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export async function getPendingListingsForCollection(slug: Slug): Promise<Listing[]> {
  return pipe(
    getListingsCollectionReference,
    queryWhere('state', 'in', notReadOnlyListingStates),
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('itemCollections', 'array-contains', slug),
        Filter.where('target.collection.slug', '==', slug)
      )
    ),
    getQueryData
  )()
}
