import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { type Listing } from '@echo/model/types/listing/listing'
import type { Slug } from '@echo/model/types/slug'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingsForCollectionQuery(slug: Slug): Query<Listing, ListingDocumentData> {
  return pipe(
    getListingsCollectionReference,
    queryOrderBy('expiresAt', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('itemCollections', 'array-contains', slug),
        Filter.where('target.collection.slug', '==', slug)
      )
    )
  )()
}
