import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { notReadOnlyOfferStates } from '@echo/model/constants/offer-state'
import { type Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import { now } from '@echo/utils/helpers/now'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export async function getPendingOffersForCollection(slug: Slug): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', notReadOnlyOfferStates),
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemCollections', 'array-contains', slug),
        Filter.where('senderItemCollections', 'array-contains', slug)
      )
    ),
    getQueryData
  )()
}
