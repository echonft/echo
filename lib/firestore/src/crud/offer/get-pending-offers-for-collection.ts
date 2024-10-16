import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer/offer'
import { now } from '@echo/utils/helpers/now'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export async function getPendingOffersForCollection(slug: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
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
