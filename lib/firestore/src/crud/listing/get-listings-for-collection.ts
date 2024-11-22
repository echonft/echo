import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingsForCollectionQuery(slug: Lowercase<string>): Query<ListingDocument> {
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

export function getListingsForCollection(slug: Lowercase<string>): Promise<ListingDocument[]> {
  return pipe(getListingsForCollectionQuery, getQueryData)(slug)
}
