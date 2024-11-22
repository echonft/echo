import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOffersForCollectionQuery(slug: Lowercase<string>): Query<OfferDocument> {
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

export function getOffersForCollection(slug: Lowercase<string>): Promise<OfferDocument[]> {
  return pipe(getOffersForCollectionQuery, getQueryData)(slug)
}
