import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { type Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOffersForCollectionQuery(slug: Slug): Query<Offer, OfferDocumentData> {
  return pipe(
    getOffersCollectionReference,
    queryOrderBy('expiresAt', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemCollections', 'array-contains', slug),
        Filter.where('senderItemCollections', 'array-contains', slug)
      )
    )
  )()
}
