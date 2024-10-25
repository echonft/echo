import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { Slug } from '@echo/model/types/slug'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingsForCollectionQuery(slug: Slug): Query<ListingDocument> {
  return pipe(
    listingsCollection,
    queryOrderBy('expiresAt', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('itemCollections', 'array-contains', slug),
        Filter.where('target.collection.slug', '==', slug)
      )
    )
  )()
}
