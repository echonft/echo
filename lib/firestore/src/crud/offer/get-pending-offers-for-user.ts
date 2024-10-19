import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { type Offer } from '@echo/model/types/offer/offer'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getPendingOffersForUser(username: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhereFilter(
      Filter.or(Filter.where('sender.username', '==', username), Filter.where('receiver.username', '==', username))
    ),
    queryWhere('locked', '==', false),
    queryOrderBy('expiresAt', 'desc'),
    getQueryData
  )()
}
