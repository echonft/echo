import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { NOT_READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import { now } from '@echo/utils/helpers/now'
import { Filter } from 'firebase-admin/firestore'
import { eqProps, partialRight, pipe } from 'ramda'

export async function getPendingListingsForCollection(slug: string): Promise<Listing[]> {
  return pipe(
    getListingsCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_LISTING_STATES),
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    queryWhereFilter<Listing>(
      Filter.or(
        Filter.where('itemCollections', 'array-contains', slug),
        Filter.where('target.collection.slug', '==', slug)
      )
    ),
    partialRight(getQueryData, [eqProps('slug')])
  )()
}
