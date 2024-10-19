import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { type Listing } from '@echo/model/types/listing/listing'
import type { Slug } from '@echo/model/types/slug'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export async function getPendingListingsForCollection(slug: Slug): Promise<Listing[]> {
  return pipe(
    getListingsCollectionReference,
    queryWhere('locked', '==', false),
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
