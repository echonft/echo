import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { Slug } from '@echo/model/types/slug'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOffersForCollectionQuery(slug: Slug): Query<OfferDocument> {
  return pipe(
    offersCollection,
    queryOrderBy('expiresAt', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemCollections', 'array-contains', slug),
        Filter.where('senderItemCollections', 'array-contains', slug)
      )
    )
  )()
}
